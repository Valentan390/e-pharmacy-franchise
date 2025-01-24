import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateShopDto } from './dto/createShop.dto';
import { User } from 'src/users/schemas/User.shema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateShopDto } from './dto/updateShop.dto';
import { EmptyBodyPipe } from 'src/common/pipe/emptyBody.pipe';
import { AddProductDto } from './dto/addProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ParamsDto } from './dto/params.dto';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth } from '@nestjs/swagger';

export interface IAuthRequest extends Request {
  user: User;
}

@ApiBearerAuth()
@Controller('api/shop')
export class ShopController {
  private readonly enableCloudinary: boolean;
  private readonly baseUrl: string;
  constructor(
    private shopService: ShopService,
    private cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {
    this.enableCloudinary = this.configService.get<boolean>(
      'ENABLE_CLOUDINARY',
      false,
    );
    this.baseUrl = this.configService.get<string>(
      'BASE_URL',
      'http://localhost:3000',
    );
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('logo'))
  async addShop(
    @Req() req: IAuthRequest,
    @Body(new EmptyBodyPipe(), new ValidationPipe()) body: CreateShopDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { _id: userId } = req.user;

    const shop = await this.shopService.getShop({ userId });

    if (shop) {
      throw new ConflictException(`User store created.`);
    }

    let logo = '';

    if (file) {
      if (this.enableCloudinary) {
        logo = await this.cloudinaryService.uploadFile(file, 'shopLogo');
      } else {
        const relativePath = await this.shopService.saveFileToUploadsDir(
          file,
          'logo',
        );
        logo = `${this.baseUrl}/uploads/${relativePath.replace(/\\/g, '/')}`;
      }
    }

    const newShop = await this.shopService.createShop({
      ...body,
      logo,
      userId,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Shop create successfully.',
      newShop,
    };
  }

  @Get(':shopId')
  async getShopUser(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
  ) {
    const { _id: userId } = req.user;
    const { shopId } = params;

    const shop = await this.shopService.getShop({ _id: shopId, userId });

    if (!shop) {
      throw new NotFoundException(`Shop not found`);
    }

    return {
      status: HttpStatus.OK,
      message: `Shop fetched successfully`,
      shop,
    };
  }

  @Put(':shopId/update')
  async updateShop(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
    @Body(new EmptyBodyPipe(), new ValidationPipe()) body: UpdateShopDto,
  ) {
    const { _id: userId } = req.user;
    const { shopId } = params;

    const { data, isNew } = await this.shopService.updateShop(
      { _id: shopId, userId },
      { ...body, userId },
      { upsert: true },
    );

    const status = isNew ? HttpStatus.CREATED : HttpStatus.OK;

    return { status, message: 'Shop upserted successfully', data };
  }

  @Get(':shopId/product')
  async getProductsShop(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
  ) {
    const { _id: userId } = req.user;
    const { shopId } = params;

    const products = await this.shopService.getProducts({ shopId, userId });

    if (!products) {
      throw new NotFoundException(`ShopId:${shopId} store products not found.`);
    }

    return {
      status: HttpStatus.OK,
      message: 'Products found successfully.',
      products,
    };
  }

  @Post(':shopId/product/add')
  @UseInterceptors(FileInterceptor('photo'))
  async addProductShop(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
    @Body(new EmptyBodyPipe(), new ValidationPipe()) body: AddProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { _id: userId } = req.user;
    const { shopId } = params;

    let photo = '';

    if (file) {
      if (this.enableCloudinary) {
        photo = await this.cloudinaryService.uploadFile(file, 'photoProduct');
      } else {
        const relativePath = await this.shopService.saveFileToUploadsDir(
          file,
          'photoProduct',
        );
        photo = `${this.baseUrl}/uploads/${relativePath.replace(/\\/g, '/')}`;
      }
    }

    const newProduct = await this.shopService.addProduct({
      ...body,
      photo,
      userId,
      shopId,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Product create successfully.',
      newProduct,
    };
  }

  @Get(':shopId/product/:productId')
  async getProductById(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
  ) {
    const { _id: userId } = req.user;
    const { productId, shopId } = params;

    const product = await this.shopService.getProductById({
      _id: productId,
      shopId,
      userId,
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${productId} not found in shop ${shopId}.`,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'Product found successfully.',
      product,
    };
  }

  @Put(':shopId/product/:productId/edit')
  @UseInterceptors(FileInterceptor('photo'))
  async updateProductById(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
    @Body(new EmptyBodyPipe(), new ValidationPipe()) body: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { _id: userId } = req.user;
    const { shopId, productId } = params;

    let photo = '';

    if (file) {
      if (this.enableCloudinary) {
        photo = await this.cloudinaryService.uploadFile(file, 'photoProduct');
      } else {
        const relativePath = await this.shopService.saveFileToUploadsDir(
          file,
          'photoProduct',
        );
        photo = `${this.baseUrl}/uploads/${relativePath.replace(/\\/g, '/')}`;
      }
    }

    const { product, isNew } = await this.shopService.updateProductById(
      {
        _id: productId,
        shopId,
        userId,
      },
      { ...body, photo },
      { upsert: true },
    );

    const status = isNew ? HttpStatus.CREATED : HttpStatus.OK;

    return {
      status,
      message: 'Product updated successfully.',
      product,
    };
  }

  @Delete(':shopId/product/:productId/delete')
  async deleteProductById(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
  ) {
    const { _id: userId } = req.user;

    const { shopId, productId } = params;

    const result = await this.shopService.deleteProduct({
      _id: productId,
      shopId,
      userId,
    });

    if (!result) {
      throw new NotFoundException(`Product with id=${productId} not found`);
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: `Product with id=${result._id} deleted successfully`,
    };
  }
}

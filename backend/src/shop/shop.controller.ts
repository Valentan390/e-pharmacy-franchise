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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Shop } from './schemas/shop.schema';
import { Product } from './schemas/product.schema';

export interface IAuthRequest extends Request {
  user: User;
}

@ApiBearerAuth()
@ApiExtraModels(Shop)
@ApiExtraModels(Product)
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
  @ApiOperation({ summary: 'Creates a user store.' })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for user authentication.',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Shop created successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.CREATED },
            message: { type: 'string', example: 'Shop created successfully.' },
            newShop: { $ref: getSchemaPath(Shop) },
          },
        },
      ],
    },
  })
  @ApiConflictResponse({
    description: 'Conflict. User store already created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body or validation error.',
  })
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
  @ApiOperation({ summary: 'Loads detailed information about the store.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the store to fetch.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Store fetched successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: { type: 'string', example: 'Shop fetched successfully' },
            shop: { $ref: getSchemaPath(Shop) },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Store not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authorized.',
  })
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
  @ApiOperation({ summary: 'Updates store data.' })
  @ApiParam({
    name: 'shopId',
    description: 'The ID of the store to update.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Store updated successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: { type: 'string', example: 'Shop updated successfully' },
            shop: { $ref: getSchemaPath(Shop) },
          },
        },
      ],
    },
  })
  @ApiCreatedResponse({
    description: 'Store created successfully (upserted).',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.CREATED },
            message: { type: 'string', example: 'Shop created successfully' },
            shop: { $ref: getSchemaPath(Shop) },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request parameters or body.',
  })
  @ApiNotFoundResponse({
    description: 'Store not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  async updateShop(
    @Req() req: IAuthRequest,
    @Param(new ValidationPipe()) params: ParamsDto,
    @Body(new EmptyBodyPipe(), new ValidationPipe()) body: UpdateShopDto,
  ) {
    const { _id: userId } = req.user;
    const { shopId } = params;

    const { shop, isNew } = await this.shopService.updateShop(
      { _id: shopId, userId },
      { ...body, userId },
      { upsert: true },
    );

    const status = isNew ? HttpStatus.CREATED : HttpStatus.OK;

    return { status, message: 'Shop upserted successfully', shop };
  }

  @Get(':shopId/product')
  @ApiOperation({ summary: 'Getting a list of store products.' })
  @ApiParam({
    name: 'shopId',
    description: 'The ID of the store.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'List of products retrieved successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: { type: 'string', example: '' },
            products: {
              type: 'array',
              items: { $ref: getSchemaPath(Product) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Store or products not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid shopId or request parameters.',
  })
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
  @ApiOperation({ summary: 'Adds a new product to the user store.' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'shopId',
    description: 'The ID of the store.',
    required: true,
    type: String,
  })
  @ApiCreatedResponse({
    description: 'Product successfully created.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.CREATED },
            message: {
              type: 'string',
              example: 'Product create successfully.',
            },
            newProduct: { $ref: getSchemaPath(Product) },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data or file upload issue.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  @ApiNotFoundResponse({
    description: 'Store not found.',
  })
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
  @ApiOperation({
    summary: 'Get information about a specific product from the user store.',
  })
  @ApiParam({
    name: 'shopId',
    description: 'The ID of the store.',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'productId',
    description: 'The ID of the product to fetch.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Product found successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: { type: 'string', example: 'Product found successfully.' },
            product: { $ref: getSchemaPath(Product) },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Product or store not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request parameters.',
  })
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
  @ApiOperation({ summary: 'Updates data for an existing product.' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'shopId',
    description: 'The ID of the store.',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'productId',
    description: 'The ID of the product to fetch.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Product updated successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: {
              type: 'string',
              example: 'Product updated successfully.',
            },
            product: { $ref: getSchemaPath(Product) },
          },
        },
      ],
    },
  })
  @ApiCreatedResponse({
    description: 'New product created due to upsert operation.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.CREATED },
            message: {
              type: 'string',
              example: 'Product updated successfully.',
            },
            product: { $ref: getSchemaPath(Product) },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Product or store not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request parameters or file upload issue.',
  })
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
  @ApiOperation({ summary: 'Removes a product from the store.' })
  @ApiParam({
    name: 'shopId',
    description: 'The ID of the store.',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'productId',
    description: 'The ID of the product to fetch.',
    required: true,
    type: String,
  })
  @ApiNoContentResponse({
    description: 'Product deleted successfully.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.NO_CONTENT },
            message: {
              type: 'string',
              example: 'Product with id=12345 deleted successfully',
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Product or store not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request parameters.',
  })
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

import {
  Body,
  ConflictException,
  Controller,
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
import { ObjectId } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/common/pipe/validateObjectId.pipe';
import { UpdateShopDto } from './dto/updateShop.dto';
import { EmptyBodyPipe } from 'src/common/pipe/emptyBody.pipe';

export interface IAuthRequest extends Request {
  user: User;
}

@Controller('api/shop')
export class ShopController {
  private readonly enableCloudinary: boolean;
  private readonly baseUrl: string;
  constructor(
    private shopService: ShopService,
    private cloudinaryService: CloudinaryService,
  ) {
    this.enableCloudinary = process.env.ENABLE_CLOUDINARY === 'true';
    this.baseUrl = process.env.BASE_URL;
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

  @Get(':id')
  async getShopById(
    @Req() req: IAuthRequest,
    @Param('id', new ValidateObjectIdPipe()) id: ObjectId,
  ) {
    const { _id: userId } = req.user;

    const shop = await this.shopService.getShop({ _id: id, userId });

    if (!shop) {
      throw new NotFoundException(`Shop with id=${id} not found`);
    }

    return {
      status: HttpStatus.OK,
      message: `Shop with id=${id} fetched successfully`,
      shop,
    };
  }

  @Put(':id/update')
  async updateShop(
    @Req() req: IAuthRequest,
    @Param('id', new ValidateObjectIdPipe()) id: ObjectId,
    @Body(new EmptyBodyPipe(), new ValidationPipe()) body: UpdateShopDto,
  ) {
    const { _id: userId } = req.user;

    const { data, isNew } = await this.shopService.updateShop(
      { _id: id, userId },
      { ...body, userId },
      { upsert: true },
    );

    const status = isNew ? HttpStatus.CREATED : HttpStatus.OK;

    return { status, message: 'Shop upserted successfully', data };
  }
}

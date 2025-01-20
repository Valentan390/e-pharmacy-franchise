import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
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
    @Body(new ValidationPipe()) body: CreateShopDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { _id: userId } = req.user;
    const { email, phone } = body;

    const shop = await this.shopService.getShop({ userId, email, phone });

    if (shop) {
      throw new ConflictException(
        `A store with a mail:${email} or phone:${phone} already exists.`,
      );
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
}

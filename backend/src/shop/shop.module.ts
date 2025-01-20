import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopDocument, ShopSchema } from './schemas/shop.schema';
import { handleSaveError, setUpdateSettings } from 'src/users/schemas/hooks';
import { AuthMiddleware } from 'src/common/middleware/authenticate.middleware';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/utils/multer.config';

@Module({
  imports: [
    CloudinaryModule,
    UsersModule,
    MongooseModule.forFeatureAsync([
      {
        name: Shop.name,
        useFactory: () => {
          ShopSchema.post('save', handleSaveError<ShopDocument>);
          ShopSchema.pre('findOneAndUpdate', setUpdateSettings<ShopDocument>);
          ShopSchema.post('findOneAndUpdate', handleSaveError<ShopDocument>);
          return ShopSchema;
        },
      },
    ]),
    MulterModule.register(multerConfig),
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/shop');
  }
}

import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopDocument, ShopSchema } from './schemas/shop.schema';
import { handleSaveError, setUpdateSettings } from 'src/users/schemas/hooks';

@Module({
  imports: [
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
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}

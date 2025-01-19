import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from './schemas/shop.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}
}

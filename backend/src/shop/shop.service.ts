import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from './schemas/shop.schema';
import { Model, RootFilterQuery } from 'mongoose';
import { UPLOAD_DIR } from '../constants/index';
import { rename } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

  async createShop(payload: Shop): Promise<Shop> {
    return await this.shopModel.create(payload);
  }

  async getShop(filter: RootFilterQuery<Shop>) {
    return await this.shopModel.findOne(filter);
  }

  async saveFileToUploadsDir(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const newPath = join(UPLOAD_DIR, folder, file.filename);
    await rename(file.path, newPath);
    return join(folder, file.filename);
  }
}

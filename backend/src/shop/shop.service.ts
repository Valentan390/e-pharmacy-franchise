import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from './schemas/shop.schema';
import {
  FilterQuery,
  Model,
  ObjectId,
  RootFilterQuery,
  UpdateQuery,
} from 'mongoose';
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

  async getShopById(id: ObjectId): Promise<Shop> {
    return await this.shopModel.findById(id);
  }

  async updateShop(
    filter: FilterQuery<Shop>,
    payload: UpdateQuery<Shop>,
    options = {},
  ): Promise<{ data: Shop; isNew: boolean } | null> {
    const result = await this.shopModel.findOneAndUpdate(filter, payload, {
      includeResultMetadata: true,
      ...options,
    });

    if (!result || !result.value) {
      throw new NotFoundException(`Shop with id=${filter._id} not found`);
    }

    return {
      data: result.value,
      isNew: Boolean(result.lastErrorObject.upserted),
    };
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

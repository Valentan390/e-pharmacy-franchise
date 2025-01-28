import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from './schemas/shop.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { UPLOAD_DIR } from '../constants/index';
import { rename } from 'node:fs/promises';
import { join } from 'node:path';
import { Product } from './schemas/product.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<Shop>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createShop(payload: Shop): Promise<Shop> {
    return await this.shopModel.create(payload);
  }

  async getShop(filter: FilterQuery<Shop>): Promise<Shop | null> {
    return await this.shopModel.findOne(filter);
  }

  async updateShop(
    filter: FilterQuery<Shop>,
    payload: UpdateQuery<Shop>,
    options = {},
  ): Promise<{ shop: Shop; isNew: boolean } | null> {
    const result = await this.shopModel.findOneAndUpdate(filter, payload, {
      includeResultMetadata: true,
      ...options,
    });

    if (!result || !result.value) {
      throw new NotFoundException(`Shop with id=${filter._id} not found`);
    }

    return {
      shop: result.value,
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

  async getProducts(filter: FilterQuery<Product>): Promise<Product[]> {
    return await this.productModel.find(filter);
  }

  async addProduct(payload: Product): Promise<Product> {
    return await this.productModel.create(payload);
  }

  async getProductById(filter: FilterQuery<Product>): Promise<Product | null> {
    return await this.productModel.findOne(filter);
  }

  //   async updateProductById(
  //     filter: FilterQuery<Product>,
  //     payload: UpdateQuery<Product>,
  //     options = {},
  //   ): Promise<{ product: Product; isNew: boolean | null }> {
  //     const result = await this.productModel.findOneAndUpdate(filter, payload, {
  //       includeResultMetadata: true,
  //       ...options,
  //     });

  //     if (!result || !result.value) {
  //       throw new NotFoundException(`Product with id=${filter._id} not found`);
  //     }

  //     return {
  //       product: result.value,
  //       isNew: Boolean(result.lastErrorObject.upserted),
  //     };
  //   }

  async updateProductById(
    filter: FilterQuery<Product>,
    payload: UpdateQuery<Product>,
    options = { upsert: false },
  ): Promise<{ product: Product; isNew: boolean }> {
    const product = await this.productModel.findOneAndUpdate(filter, payload, {
      new: true,
      upsert: options.upsert,
      runValidators: true,
    });

    if (!product) {
      throw new NotFoundException(`Product with id=${filter._id} not found`);
    }

    return {
      product,
      isNew: options.upsert,
    };
  }

  async deleteProduct(filter: FilterQuery<Product>): Promise<Product | null> {
    return await this.productModel.findOneAndDelete(filter);
  }
}

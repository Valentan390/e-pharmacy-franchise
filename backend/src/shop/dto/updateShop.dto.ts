import { PartialType } from '@nestjs/mapped-types';
import { CreateShopDto } from './createShop.dto';
import { IsOptional } from 'class-validator';

export class UpdateShopDto extends PartialType(CreateShopDto) {
  @IsOptional()
  shopName?: string;

  @IsOptional()
  ownerName?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  street?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  zipPostal?: string;

  @IsOptional()
  logo?: string;

  @IsOptional()
  ownDeliverySystem?: boolean;
}

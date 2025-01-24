import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateShopDto } from './createShop.dto';
import { IsOptional } from 'class-validator';

export class UpdateShopDto extends PartialType(CreateShopDto) {
  @ApiPropertyOptional({
    description: 'The updated name of the shop.',
    example: 'New Awesome Shop',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  shopName?: string;

  @ApiPropertyOptional({
    description: 'The updated name of the shop owner.',
    example: 'Jane Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  ownerName?: string;

  @ApiPropertyOptional({
    description: 'The updated email address of the shop.',
    example: 'new-shop@example.com',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'The updated phone number of the shop.',
    example: '097-555-22-11',
  })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'The updated street address of the shop.',
    example: '456 Another Street',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({
    description: 'The updated city where the shop is located.',
    example: 'Los Angeles',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'The updated zip or postal code of the shop.',
    example: '54321-9876',
  })
  @IsOptional()
  zipPostal?: string;

  @ApiPropertyOptional({
    description: 'The updated logo of the shop as a file.',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  logo?: Express.Multer.File;

  @ApiPropertyOptional({
    description:
      'Indicates whether the shop has an updated own delivery system.',
    example: true,
  })
  @IsOptional()
  ownDeliverySystem?: boolean;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { AddProductDto } from './addProduct.dto';

export class UpdateProductDto extends PartialType(AddProductDto) {
  @ApiPropertyOptional({
    description: 'The updated photo of the product as a file.',
    type: 'string',
    format: 'binary',
  })
  photo?: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'The updated name of the product.',
    example: 'Updated Product Name',
    minLength: 2,
    maxLength: 50,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'The updated price of the product as a numeric value.',
    example: '249.99',
    maxLength: 10,
  })
  price?: string;

  @ApiPropertyOptional({
    description: 'The updated description of the product.',
    example: 'Updated product description with more details.',
    minLength: 5,
    maxLength: 255,
  })
  description?: string;
}

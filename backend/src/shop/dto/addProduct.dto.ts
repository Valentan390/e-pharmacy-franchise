import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  Matches,
  IsNumberString,
} from 'class-validator';
import { urlRegexp } from 'src/constants/shop';

export class AddProductDto {
  @ApiPropertyOptional({
    description: 'The photo of the product as a file.',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  photo?: Express.Multer.File;

  @ApiProperty({
    description: 'The name of the product.',
    example: 'Product Name',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
  name: string;

  @ApiProperty({
    description: 'The price of the product as a numeric value.',
    example: '199.99',
    maxLength: 10,
  })
  @IsNotEmpty({ message: 'Price is required.' })
  @IsNumberString({}, { message: 'Price must be a numeric value.' })
  @MaxLength(10, { message: 'Price must not exceed 10 digits.' })
  price: string;

  @ApiPropertyOptional({
    description: 'A description of the product.',
    example: 'This is a high-quality product.',
    minLength: 5,
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @MinLength(5, { message: 'Description must be at least 5 characters long.' })
  @MaxLength(255, { message: 'Description must not exceed 255 characters.' })
  description?: string;
}

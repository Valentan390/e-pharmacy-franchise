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
  @IsOptional()
  @Matches(urlRegexp, {
    message: 'Photo URL must be a valid URL starting with http or https.',
  })
  photo?: string;

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters.' })
  name: string;

  @IsNotEmpty({ message: 'Price is required.' })
  @IsNumberString({}, { message: 'Price must be a numeric value.' })
  @MaxLength(10, { message: 'Price must not exceed 10 digits.' })
  price: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @MinLength(5, { message: 'Description must be at least 5 characters long.' })
  @MaxLength(255, { message: 'Description must not exceed 255 characters.' })
  description?: string;
}

import { IsMongoId, IsOptional } from 'class-validator';

export class ParamsDto {
  @IsOptional()
  @IsMongoId({ message: 'Invalid shopId format.' })
  shopId?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid productId format.' })
  productId?: string;
}

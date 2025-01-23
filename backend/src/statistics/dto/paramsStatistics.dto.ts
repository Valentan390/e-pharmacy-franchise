import { IsMongoId } from 'class-validator';

export class ParamsStatisticsDto {
  @IsMongoId({ message: 'Invalid clientId format.' })
  clientId: string;
}

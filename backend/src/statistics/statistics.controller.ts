import { Controller } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('api/statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}
}

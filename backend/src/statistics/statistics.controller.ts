import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ParamsStatisticsDto } from './dto/paramsStatistics.dto';

@Controller('api/statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  async getStatisticsShop() {
    const clientsShop = await this.statisticsService.getClientShop();

    const incomeExpensesShop =
      await this.statisticsService.getIncomeExpensesShop();

    return {
      status: HttpStatus.OK,
      message: 'Statistics retrieved successfully.',
      clientsShop: clientsShop.length > 0 ? clientsShop : 'No clients found.',
      incomeExpensesShop:
        incomeExpensesShop.length > 0
          ? incomeExpensesShop
          : 'No income or expenses found.',
    };
  }

  @Get(':clientId/goods')
  async getClientByIdGoods(
    @Param(new ValidationPipe()) params: ParamsStatisticsDto,
  ) {
    const { clientId } = params;

    const client = await this.statisticsService.getClientById({
      _id: clientId,
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found.`);
    }

    return {
      status: HttpStatus.OK,
      message: 'Client successfully found',
      client,
    };
  }
}

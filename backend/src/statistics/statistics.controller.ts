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
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  getSchemaPath,
} from '@nestjs/swagger';
import { Client } from './schemas/clients.schema';
import { IncomeExpense } from './schemas/income-expenses.schema';

@ApiBearerAuth()
@ApiExtraModels(Client)
@ApiExtraModels(IncomeExpense)
@Controller('api/statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({ summary: 'We receive statistical data from the store.' })
  @ApiOkResponse({
    description: 'Successfully retrieved store statistics.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: {
              type: 'string',
              example: 'Statistics retrieved successfully.',
            },
            clientsShop: {
              oneOf: [
                {
                  type: 'array',
                  items: { $ref: getSchemaPath(Client) },
                },
                { type: 'string', example: 'No clients found.' },
              ],
            },
            incomeExpensesShop: {
              oneOf: [
                {
                  type: 'array',
                  items: { $ref: getSchemaPath(IncomeExpense) },
                },
                { type: 'string', example: 'No income or expenses found.' },
              ],
            },
          },
        },
      ],
    },
  })
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
  @ApiOperation({ summary: 'Information about the customer purchases.' })
  @ApiParam({
    name: 'clientId',
    description: 'The ID of the client whose purchases are being retrieved.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description:
      'Successfully retrieved client information and their purchases.',
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number', example: HttpStatus.OK },
            message: { type: 'string', example: 'Client successfully found' },
            client: { $ref: getSchemaPath(Client) },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Client not found.',
  })
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

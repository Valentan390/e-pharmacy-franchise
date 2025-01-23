import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeExpensesDto } from './createIncomeExpenses.dto';

export class UpdateIncomeExpensesDto extends PartialType(
  CreateIncomeExpensesDto,
) {}

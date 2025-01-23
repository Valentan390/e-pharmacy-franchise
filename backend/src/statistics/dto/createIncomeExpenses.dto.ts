import { IsNotEmpty, IsString, IsIn, IsNumber, Min } from 'class-validator';

export class CreateIncomeExpensesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Expense', 'Income'])
  type: 'Expense' | 'Income';
}

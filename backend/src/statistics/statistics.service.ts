import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schemas/clients.schema';
import { Model } from 'mongoose';
import { IncomeExpense } from './schemas/income-expenses.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(IncomeExpense.name)
    private incomeExpenseModel: Model<IncomeExpense>,
  ) {}
}

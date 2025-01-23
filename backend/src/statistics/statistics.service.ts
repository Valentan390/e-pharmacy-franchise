import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schemas/clients.schema';
import { FilterQuery, Model } from 'mongoose';
import { IncomeExpense } from './schemas/income-expenses.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(IncomeExpense.name)
    private incomeExpenseModel: Model<IncomeExpense>,
  ) {}

  async getClientShop(filter: FilterQuery<Client> = {}): Promise<Client[]> {
    return await this.clientModel.find(filter);
  }

  async getClientById(filter: FilterQuery<Client>): Promise<Client | null> {
    return await this.clientModel.findOne(filter);
  }

  async getIncomeExpensesShop(
    filter: FilterQuery<Client> = {},
  ): Promise<IncomeExpense[]> {
    return await this.incomeExpenseModel.find(filter);
  }
}

import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientDocument, ClientSchema } from './schemas/clients.schema';
import { handleSaveError, setUpdateSettings } from 'src/users/schemas/hooks';
import {
  IncomeExpense,
  IncomeExpenseSchema,
  IncomeExpensesDocument,
} from './schemas/income-expenses.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Client.name,
        useFactory: () => {
          ClientSchema.post('save', handleSaveError<ClientDocument>);
          ClientSchema.pre(
            'findOneAndUpdate',
            setUpdateSettings<ClientDocument>,
          );
          ClientSchema.post(
            'findOneAndUpdate',
            handleSaveError<ClientDocument>,
          );
          return ClientSchema;
        },
      },
      {
        name: IncomeExpense.name,
        useFactory: () => {
          IncomeExpenseSchema.post(
            'save',
            handleSaveError<IncomeExpensesDocument>,
          );
          IncomeExpenseSchema.pre(
            'findOneAndUpdate',
            setUpdateSettings<IncomeExpensesDocument>,
          );
          IncomeExpenseSchema.post(
            'findOneAndUpdate',
            handleSaveError<IncomeExpensesDocument>,
          );
          return IncomeExpenseSchema;
        },
      },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}

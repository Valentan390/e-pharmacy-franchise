import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IncomeExpensesDocument = HydratedDocument<IncomeExpense>;

@Schema({ versionKey: false, timestamps: true })
export class IncomeExpense {
  _id?: string;

  @Prop({
    type: String,
    minlength: 2,
    maxlength: 100,
    trim: true,
    required: true,
  })
  name: string;

  @Prop({ type: Number, min: 0, required: true })
  amount: number;

  @Prop({
    type: String,
    enum: ['Expense', 'Income'],
    trim: true,
    required: true,
  })
  type: 'Expense' | 'Income';

  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  shopId: string;
}

export const IncomeExpenseSchema = SchemaFactory.createForClass(IncomeExpense);

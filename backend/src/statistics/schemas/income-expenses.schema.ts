import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type IncomeExpensesDocument = HydratedDocument<IncomeExpense>;

@Schema({ versionKey: false, timestamps: true })
export class IncomeExpense {
  @ApiProperty({
    description: 'Unique identifier of the income or expense record.',
    example: '63f7b5c4e43e1a7d8cfc1234',
  })
  _id?: string;

  @ApiProperty({
    description: 'Name or description of the income or expense.',
    example: 'Office Rent',
    minLength: 2,
    maxLength: 100,
  })
  @Prop({
    type: String,
    minlength: 2,
    maxlength: 100,
    trim: true,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Amount of the income or expense.',
    example: 1500,
    minimum: 0,
  })
  @Prop({ type: Number, min: 0, required: true })
  amount: number;

  @ApiProperty({
    description: 'Type of the record, either Income or Expense.',
    example: 'Expense',
    enum: ['Expense', 'Income'],
  })
  @Prop({
    type: String,
    enum: ['Expense', 'Income'],
    trim: true,
    required: true,
  })
  type: 'Expense' | 'Income';

  @ApiProperty({
    description: 'Unique identifier of the user associated with this record.',
    example: '63f7b5c4e43e1a7d8cfc5678',
  })
  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @ApiProperty({
    description: 'Unique identifier of the shop associated with this record.',
    example: '63f7b5c4e43e1a7d8cfc9101',
  })
  @Prop({ type: String, required: true, unique: true })
  shopId: string;
}

export const IncomeExpenseSchema = SchemaFactory.createForClass(IncomeExpense);

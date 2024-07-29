import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense as ExpenseModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async createExpense(
    @Body()
    expenseData: {
      name: string;
      date: string;
      amount: number;
    },
    @Req() req,
  ): Promise<ExpenseModel> {
    const userId = req.user.userId;
    return this.expensesService.create({ ...expenseData, userId });
  }

  @Get()
  async getAllExpenses(): Promise<ExpenseModel[]> {
    return this.expensesService.findAll();
  }

  @Put(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() expenseData: { name?: string; date?: string; amount?: number },
  ): Promise<ExpenseModel> {
    return this.expensesService.update(Number(id), expenseData);
  }

  @Delete(':id')
  async deleteIncome(@Param('id') id: string): Promise<ExpenseModel> {
    return this.expensesService.remove(Number(id));
  }
}

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
  async getAllExpenses(@Req() req): Promise<ExpenseModel[]> {
    const userId = req.user.userId;
    return this.expensesService.findAllByUserId(userId);
  }

  @Put(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() expenseData: { name?: string; date?: string; amount?: number },
    @Req() req,
  ): Promise<ExpenseModel> {
    const userId = req.user.userId;
    const updatedExpenseData = { ...expenseData, userId };
    return this.expensesService.update(id, updatedExpenseData);
  }

  @Delete(':id')
  async deleteExpense(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ExpenseModel> {
    const userId = req.user.userId;
    return this.expensesService.remove(id, userId);
  }
}

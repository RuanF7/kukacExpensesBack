import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Expense } from '@prisma/client';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    date: string;
    amount: number;
    userId: string;
  }): Promise<Expense> {
    console.log('Creating Expense with data:', data);
    const expenseData: Prisma.ExpenseCreateInput = {
      name: data.name,
      date: new Date(data.date),
      amount: data.amount,
      user: {
        connect: { id: data.userId },
      },
    };
    return this.prisma.expense.create({ data: expenseData });
  }

  async findAllByUserId(userId: string): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: { userId: userId },
    });
  }

  async update(
    id: string,
    data: { name?: string; date?: string; amount?: number },
  ): Promise<Expense> {
    const updateData: Prisma.ExpenseUpdateInput = {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    };
    return this.prisma.expense.update({
      where: { id: id },
      data: updateData,
    });
  }

  async remove(id: string, userId: string): Promise<Expense> {
    return this.prisma.expense.delete({
      where: { id: id, userId: userId },
    });
  }
}

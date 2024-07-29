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

  async findAll(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  async update(
    id: number,
    data: { name?: string; date?: string; amount?: number },
  ): Promise<Expense> {
    const updateData: Prisma.ExpenseUpdateInput = {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    };
    return this.prisma.expense.update({
      where: { id: id.toString() },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Expense> {
    return this.prisma.expense.delete({
      where: { id: id.toString() },
    });
  }
}

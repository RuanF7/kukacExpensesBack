import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Income } from '@prisma/client';

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    name: string;
    date: string;
    amount: number;
    userId: string;
  }): Promise<Income> {
    const incomeData: Prisma.IncomeCreateInput = {
      name: data.name,
      date: new Date(data.date),
      amount: data.amount,
      user: {
        connect: { id: data.userId },
      },
    };
    return this.prisma.income.create({ data: incomeData });
  }

  async findAll(): Promise<Income[]> {
    return this.prisma.income.findMany();
  }

  async update(
    id: number,
    data: { name?: string; date?: string; amount?: number },
  ): Promise<Income> {
    const updateData: Prisma.IncomeUpdateInput = {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    };
    return this.prisma.income.update({
      where: { id: id.toString() },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Income> {
    return this.prisma.income.delete({
      where: { id: id.toString() },
    });
  }
}

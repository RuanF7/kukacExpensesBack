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
    console.log('Creating Income with data:', data);
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

  async findAllByUserId(userId: string): Promise<Income[]> {
    return this.prisma.income.findMany({
      where: { userId: userId },
    });
  }

  async update(
    id: string,
    data: { name?: string; date?: string; amount?: number },
  ): Promise<Income> {
    const updateData: Prisma.IncomeUpdateInput = {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    };
    return this.prisma.income.update({
      where: { id: id },
      data: updateData,
    });
  }

  async remove(id: string, userId: string): Promise<Income> {
    return this.prisma.income.delete({
      where: { id: id, userId: userId },
    });
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { Income as IncomeModel } from '@prisma/client';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  async createIncome(
    @Body()
    incomeData: {
      name: string;
      date: string;
      amount: number;
      userId: string;
    },
  ): Promise<IncomeModel> {
    return this.incomesService.create(incomeData);
  }

  @Get()
  async getAllIncomes(): Promise<IncomeModel[]> {
    return this.incomesService.findAll();
  }

  @Put(':id')
  async updateIncome(
    @Param('id') id: string,
    @Body() incomeData: { name?: string; date?: string; amount?: number },
  ): Promise<IncomeModel> {
    return this.incomesService.update(Number(id), incomeData);
  }

  @Delete(':id')
  async deleteIncome(@Param('id') id: string): Promise<IncomeModel> {
    return this.incomesService.remove(Number(id));
  }
}

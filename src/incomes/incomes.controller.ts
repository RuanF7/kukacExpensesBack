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
import { IncomesService } from './incomes.service';
import { Income as IncomeModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('incomes')
@UseGuards(AuthGuard('jwt'))
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  async createIncome(
    @Body()
    incomeData: {
      name: string;
      date: string;
      amount: number;
    },
    @Req() req,
  ): Promise<IncomeModel> {
    const userId = req.user.userId;
    return this.incomesService.create({ ...incomeData, userId });
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

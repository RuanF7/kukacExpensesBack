import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; password?: string },
  ): Promise<UserModel> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove(id);
  }

  @Get('exists')
  async checkIfUserExists(
    @Query('email') email: string,
  ): Promise<{ exists: boolean }> {
    const user = await this.usersService.findOne(email);
    return { exists: !!user };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req): Promise<UserModel> {
    console.log('User from request:', req.user);
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID is missing from the request');
    }
    return this.usersService.findOneById(userId);
  }
}

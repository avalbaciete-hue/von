import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { username: string; password: string; role?: string }) {
    return this.usersService.createUser(body.username, body.password, body.role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
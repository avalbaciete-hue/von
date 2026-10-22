import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('trainers')
export class TrainersController {
  constructor(private trainersService: TrainersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.trainersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trainersService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.trainersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.trainersService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainersService.remove(+id);
  }
}
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FitnessClassesService } from './fitness-classes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fitness-classes')
export class FitnessClassesController {
  constructor(private fitnessClassesService: FitnessClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.fitnessClassesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.fitnessClassesService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.fitnessClassesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.fitnessClassesService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fitnessClassesService.remove(+id);
  }
}
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MembershipTypesService } from './membership-types.service';

@Controller('membership-types')
export class MembershipTypesController {
  constructor(private readonly membershipTypesService: MembershipTypesService) {}

  @Get()
  findAll() {
    return this.membershipTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipTypesService.findOne(+id);
  }

  @Post()
  create(@Body() body: { type_name: string; price: number; duration_months: number }) {
    return this.membershipTypesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.membershipTypesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipTypesService.remove(+id);
  }
}
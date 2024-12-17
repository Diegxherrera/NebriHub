import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { InstitutionClass } from './class.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  async findAll(): Promise<InstitutionClass[]> {
    console.log('Started Controller call');
    return await this.classService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InstitutionClass> {
    return this.classService.findOne(id);
  }

  @Post('create')
  async create(
    @Body() institutionClass: InstitutionClass,
  ): Promise<InstitutionClass> {
    return this.classService.create(institutionClass);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.classService.remove(id);
  }
}

// teachers/teacher.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { Institution } from '../institutions/institution.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll(): Promise<Teacher[]> {
    console.log('Started Controller call');
    return await this.teacherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Post('create')
  async create(@Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.teacherService.remove(id);
  }
}

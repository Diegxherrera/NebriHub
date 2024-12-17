import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstitutionClass } from './class.entity';
import { Institution } from '../institutions/institution.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(InstitutionClass)
    private classRepository: Repository<InstitutionClass>,
  ) {}

  async findAll(): Promise<InstitutionClass[]> {
    console.log('findAll Service: Inizio'); // Debug log
    return await this.classRepository.find();
  }

  async findOne(id: string): Promise<InstitutionClass> {
    return this.classRepository.findOne({
      where: { id: id },
    });
  }

  async create(
    institutionClassData: Partial<InstitutionClass>,
  ): Promise<InstitutionClass> {
    const newClass = this.classRepository.create(institutionClassData); // Crea una nueva instancia de Institution
    return await this.classRepository.save(newClass); // Guarda la institución en la base de datos
  }

  async remove(id: string): Promise<void> {
    await this.classRepository.delete(id);
  }
}

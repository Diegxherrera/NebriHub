import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './user.entity';
import { Student } from '../students/student.entity';
import { Teacher } from '../teachers/teacher.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  // Buscar usuario por ID
  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  // Listar todos los usuarios
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    console.log('Users fetched:', users); // Log to verify data exists
    return users;
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  // Crear usuario
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  // Eliminar usuario
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Métodx principal para obtener la información completa del usuario
  async getUserDetails(id: string): Promise<any> {
    const user = await this.findById(id);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const roles = user.roles.map((role) => role.name); // Obtener los roles del usuario

    if (roles.includes('student')) {
      // Si el usuario es un estudiante, cargar sus detalles
      const studentDetails = await this.studentRepository.findOne({
        where: { user: { id: user.id } }, // Relación entre Student y User
        relations: ['currentClass', 'subjects'],
      });
      return { user, studentDetails };
    }

    if (roles.includes('teacher')) {
      // Si el usuario es un profesor, cargar sus detalles
      const teacherDetails = await this.teacherRepository.findOne({
        where: { id: user.id }, // Relación entre Teacher y User
        relations: ['classes', 'subjects'],
      });
      return { user, teacherDetails };
    }

    // Si no es ni estudiante ni profesor, devolver solo los detalles básicos del usuario
    return { user };
  }

  async savePasswordResetToken(userId: string, token: string): Promise<void> {
    await this.userRepository.update(userId, {
      resetToken: token,
      resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
    });
  }

  async findUserIdByResetToken(token: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { resetToken: token, resetTokenExpiry: MoreThan(new Date()) },
    });
    return user ? user.id : null;
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.userRepository.update(userId, { password: hashedPassword });
  }

  async clearPasswordResetToken(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      resetToken: null,
      resetTokenExpiry: null,
    });
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { InstitutionClass } from '../classes/class.entity';
import { Subject } from '../subjects/subject.entity';
import { User } from '../users/user.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User; // Relation to the User entity for shared ID

  @OneToMany(
    () => InstitutionClass,
    (institutionClass) => institutionClass.tutor,
  )
  classes: InstitutionClass[]; // Relación Profesor (Master o Tutor) - Clase/s

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[]; // Relación Profesor - Asignaturas
}

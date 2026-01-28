import {Entity, Column} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;
  
  @Column ({ type: 'varchar', length: 14, unique: true })
  phone_number: string; 

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  designation: string;

  @Column({ type: 'varchar', length: 100 })
  department: string;

  @Column({ type: 'date' })
  date_of_birth: Date;
  
  @Column ({ type: 'boolean', default: true })
  is_active: boolean; 

}
import { Entity, JoinColumn, Column, Unique, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/roles.entity';

@Entity('user_roles')
@Unique(['user', 'role'])
export class UserRole extends BaseEntity {

    @ManyToOne(() => User, { nullable: false, eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Role, { nullable: false, eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

}


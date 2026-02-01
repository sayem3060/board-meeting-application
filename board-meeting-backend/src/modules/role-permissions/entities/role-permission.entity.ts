import { Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../roles/entities/roles.entity';   
import { Permission } from '../../permissions/entities/permissions.entity';

@Entity('role_permissions')
@Unique(['role', 'permission'])
export class RolePermission extends BaseEntity {

    @ManyToOne(() => Role, { nullable: false, eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToOne(() => Permission, { nullable: false, eager: true })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission;

}
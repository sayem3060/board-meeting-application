import { Injectable, BadGatewayException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";   
import { RolePermission } from "./entities/role-permissions.entity";
import { AssignRolePermissionDto } from "./dto/assign-role-permission.dto";

@Injectable()
export class RolePermissionsService {
    constructor(
        @InjectRepository(RolePermission)
        private rolePermissionsRepository: Repository<RolePermission>,
    ) {}

    async assignPermission(dto: AssignRolePermissionDto) {
        const exists = await this.rolePermissionsRepository.findOne({
            where: {
                role: { id: dto.role_id },
                permission: { id: dto.permission_id },
                deleted_at: IsNull(),
            },
        }); 
        if (exists) {
            throw new BadGatewayException('Permission already assigned to role');
        }
        const rolePermission = this.rolePermissionsRepository.create({
            role: { id: dto.role_id },
            permission: { id: dto.permission_id },
        });
        return await this.rolePermissionsRepository.save(rolePermission);
    }   

    async getPermissionsByRole(role_id: string) {
        return await this.rolePermissionsRepository.find({
            where: {    
                role: { id: role_id },
                deleted_at: IsNull(),
            },
            relations: ['permission'],
        });
    }

    async removePermissionFromRole(role_id: string, permission_id: string) {
        const rolePermission = await this.rolePermissionsRepository.findOne({
            where: {        
                role: { id: role_id },
                permission: { id: permission_id },   
                deleted_at: IsNull(),
            },
        }); 
        if (!rolePermission) {
            throw new BadGatewayException('Permission not assigned to role');
        }

        rolePermission.softDelete();
        return await this.rolePermissionsRepository.save(rolePermission);
    }

    async getRolesByPermissions(permission_id: string ) {
        return await this.rolePermissionsRepository.find({
            where: {
                permission: { id:  permission_id },      
                deleted_at: IsNull(),
            },
            relations: ['role'],
        });
    }
}
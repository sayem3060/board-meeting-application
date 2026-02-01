import { Injectable, BadGatewayException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";   
import { RolePermission } from "./entities/role-permission.entity";
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
                role: { id: dto.roleId },
                permission: { id: dto.permissionId },
                deleted_at: IsNull(),
            },
        }); 
        if (exists) {
            throw new BadGatewayException('Permission already assigned to role');
        }
        const rolePermission = this.rolePermissionsRepository.create({
            role: { id: dto.roleId },
            permission: { id: dto.permissionId },
        });
        return await this.rolePermissionsRepository.save(rolePermission);
    }   

    async getPermissionsByRole(roleId: string) {
        return await this.rolePermissionsRepository.find({
            where: {    
                role: { id: roleId },
                deleted_at: IsNull(),
            },
            relations: ['permission'],
        });
    }

    async removePermissionFromRole(roleId: string, permissionId: string) {
        const rolePermission = await this.rolePermissionsRepository.findOne({
            where: {        
                role: { id: roleId },
                permission: { id: permissionId },   
                deleted_at: IsNull(),
            },
        }); 
        if (!rolePermission) {
            throw new BadGatewayException('Permission not assigned to role');
        }

        rolePermission.softDelete();
        return await this.rolePermissionsRepository.save(rolePermission);
    }

    async getRolesByPermissions(permissionId: string ) {
        return await this.rolePermissionsRepository.find({
            where: {
                permission: { id:  permissionId },      
                deleted_at: IsNull(),
            },
            relations: ['role'],
        });
    }
}
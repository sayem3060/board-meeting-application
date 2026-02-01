import {  Controller,Post,Get,Delete,Body,Param,} from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { AssignRolePermissionDto } from './dto/assign-role-permission.dto';

@Controller('role-permissions')
export class RolePermissionsController {
    constructor(private readonly rolePermissionsService: RolePermissionsService) {}   

    @Post()
    async assignPermission(@Body() dto: AssignRolePermissionDto) {
        return await this.rolePermissionsService.assignPermission(dto);
    }

    @Get('role/:roleId')
    async getPermissionsByRole(@Param('roleId') roleId: string) {
        return await this.rolePermissionsService.getPermissionsByRole(roleId);
    }

    @Get('permission/:permissionId')
    async getRolesByPermissions(@Param('permissionId') permissionId: string) {
        return await this.rolePermissionsService.getRolesByPermissions(permissionId);
  }
    
    @Delete('role/:roleId/permission/:permissionId')
    async removePermissionFromRole(
        @Param('roleId') roleId: string,        
        @Param('permissionId') permissionId: string,
    ) {
        return await this.rolePermissionsService.removePermissionFromRole(roleId, permissionId);
    }   
}
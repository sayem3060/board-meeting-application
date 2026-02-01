import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async assignRoleToUser(dto: AssignUserRoleDto) {
    // Check if already assigned
    const exists = await this.userRoleRepository.findOne({
      where: {
        user: { id: dto.user_id },
        role: { id: dto.role_id },
        deleted_at: IsNull(),
      },
    });

    if (exists) {
      throw new BadRequestException('Role already assigned to this user');
    }

    // Create new mapping
    const userRole = this.userRoleRepository.create({
      user: { id: dto.user_id },
      role: { id: dto.role_id },
    });

    return await this.userRoleRepository.save(userRole);
  }

  async getRolesByUser(userId: string) {
    const userRoles = await this.userRoleRepository.find({
      where: {
        user: { id: userId },
        deleted_at: IsNull(),
      },
      relations: ['role'],
    });

    if (!userRoles.length) {
      throw new NotFoundException(`No roles found for user ${userId}`);
    }

    return userRoles;
  }

  async removeRoleFromUser(userId: string, roleId: string) {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        user: { id: userId },
        role: { id: roleId },
        deleted_at: IsNull(),
      },
    });

    if (!userRole) {
      throw new BadRequestException('Role not assigned to this user');
    }

    userRole.softDelete();
    return await this.userRoleRepository.save(userRole);
  }

  async getUsersByRole(roleId: string) {
    return await this.userRoleRepository.find({
      where: {
        role: { id: roleId },
        deleted_at: IsNull(),
      },
      relations: ['user'],
    });
  }
}
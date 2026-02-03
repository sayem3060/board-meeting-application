import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRolesService } from '../../user-roles/user-roles.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRolesService: UserRolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No user found');
    }

    const userRoles = await this.userRolesService.getRolesByUser(user.id);
    const userRoleNames = userRoles.map(ur => ur.role.role_name);

    const hasRole = requiredRoles.some(role => userRoleNames.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
import { Controller,Post,Get,Delete,Body,Param,} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly service: UserRolesService) {}

  @Post()
  assignRole(@Body() dto: AssignUserRoleDto) {
    return this.service.assignRoleToUser(dto);
  }

  @Get('user/:userId')
  getRolesByUser(@Param('userId') userId: string) {
    return this.service.getRolesByUser(userId);
  }

  @Get('role/:roleId')
  getUsersByRole(@Param('roleId') roleId: string) {
    return this.service.getUsersByRole(roleId);
  }

  @Delete(':userId/:roleId')
  removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.service.removeRoleFromUser(userId, roleId);
  }
}
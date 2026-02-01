import { IsUUID, IsNotEmpty } from 'class-validator';

export class AssignUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  role_id: string;
}
import { IsUUID, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class AssignUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  role_id: string;
}

export class SingleUserMultipleRolesDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  role_ids: string[];
}

export class MultipleUsersMultipleRolesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  user_ids: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  role_ids: string[];
}
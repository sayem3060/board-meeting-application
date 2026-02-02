import { IsUUID, IsNotEmpty } from "class-validator";   

export class AssignRolePermissionDto {

    @IsUUID()
    @IsNotEmpty()
    role_id: string;

    @IsUUID()
    @IsNotEmpty()
    permission_id: string;
}
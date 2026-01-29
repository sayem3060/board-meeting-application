import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    role_name: string;

    @IsString()
    @Length(0, 500)
    description?: string;

}
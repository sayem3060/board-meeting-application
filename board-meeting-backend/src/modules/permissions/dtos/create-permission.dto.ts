import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    permission_name: string;    

    @IsString()
    @Length(0, 500)
    description?: string;
}
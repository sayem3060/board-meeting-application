import { IsString, IsNotEmpty, Length} from "class-validator";

export class CreateCommitteeDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 150)
    committee_name: string;

    @IsString()
    @IsNotEmpty()
    description: string;    

}
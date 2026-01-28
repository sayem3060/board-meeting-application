import {IsNotEmpty, IsEmail, IsString, IsDateString, Length} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 150)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  department: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_birth: string;
}

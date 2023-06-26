import { IsDate, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Genders } from "src/model";

export class UpdateUserDto{
    @IsEmail()
    email: string

    @IsString()
    @MinLength(5)
    password: string

    // @IsString()
    // @MinLength(3)
    // nameFirst: string

    // @IsString()
    // @MinLength(3)
    // nameLast: string
    
    // @IsString()
    // @IsOptional()
    // birthDate?: Date
    
    // @IsNotEmpty()
    // @IsEnum(Genders)
    // @IsOptional()
    // gender?: Genders
}
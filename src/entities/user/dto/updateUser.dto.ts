import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Genders } from "../model";

export class UpdateUserDto{
    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    nameFirst: string

    @IsString()
    @MinLength(3)
    nameLast: string
    
    @IsISO8601()
    birthDate: Date
    
    @IsNotEmpty()
    @IsEnum(Genders)
    gender: Genders
}
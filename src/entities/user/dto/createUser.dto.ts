import exp from "constants";
import { UpdateUserDto } from "./updateUser.dto";
import { IsString } from "class-validator";


export class CreateUserDto extends UpdateUserDto{
    @IsString()
    password: string
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {Repository} from "typeorm"
import {genSalt, hash, compare} from "bcrypt"
import { ILoginUser, IUser, IUserWithoutPass } from './model';
import { omitProp } from 'src/helpers';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
    }

    public async createUser(userData: IUser): Promise<any>{
        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt)
        const newUser = await this.userRepository.create({...userData, password: hashedPassword })
        return await this.userRepository.save(newUser)
    }

    public async onLoginUser(loginData: LoginUserDto): Promise<any>{
        const user  = await this.userRepository.findOne({where: {email: loginData.email}})
        console.log(user)
        const match = await compare(loginData.password, user.password);
        if(!user) return "Email is not registered."
        else if(!match) return "Incorrect password!"
        else return "Successfull auth."
    }

    public async updateUserData(id: number,body: UpdateUserDto){
        await this.userRepository.update({id}, body)
    }

    public async getAllUsers(): Promise<IUserWithoutPass[]>{
        return await this.userRepository.find({
            select: ["nameFirst", "nameLast", "birthDate", "email", "gender"], 
        });
    }

    public async getUserData(id: number): Promise<IUserWithoutPass>{
        const user = await this.userRepository.findOne({where: {id}})
        return omitProp("password", user)
    }

    public async deleteUser(id: number): Promise<string>{
        const res = await this.userRepository.delete(id)
        if(!res.affected) return "User's not found."
        else return "User's successfully deleted."
    }
}

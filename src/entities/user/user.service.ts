import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {Repository} from "typeorm"
import {genSalt, hash, compare} from "bcrypt"
import {  ICreateUserResponse, ILoginUserResponse, IUser, IUserWithoutPass } from './model';
import { omitProp } from 'src/helpers';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';
import { status } from 'src/constants';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService){
    }


    private async _createToken(user: IUser): Promise<string>{
        const tokenPayload = { id: user.id, username: user.nameFirst };
        const token = await this.jwtService.signAsync(tokenPayload)
        return token;
    }

    public async createUser(userData: CreateUserDto): Promise<ICreateUserResponse>{
        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt)
        const newUser = await this.userRepository.create({...userData, password: hashedPassword })
        const user =  await this.userRepository.save(newUser)
        const token = await this._createToken(user);
        return {user:  omitProp("password", user), status:  200, access_token: token}
    }

    public async loginUser(loginData: LoginUserDto): Promise<ILoginUserResponse>{
        const user  = await this.userRepository.findOne({where: {email: loginData.email}})
        if(!user) {
            return {message: "Email is not registered.", status: status.requestError}
        }
        const match = await compare(loginData.password, user.password);
        if(!match){
             return {message:"Incorrect password!", status: status.requestError}
        }
        else {
            const token = await this._createToken(user)    
            return {status: status.success, access_token: token, user: omitProp("password", user)}
        }
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

import { Inject, Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { genSalt, hash, compare } from 'bcrypt';
import { ICreateUserResponse, IDeleteUserResponse, IGetUserResponse, ILoginUserResponse, IUpdateUserResponse, IUser, IUserWithoutPass } from './model';
import { omitProp } from 'src/helpers';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';
import { USER_REPOSITORY, status } from 'src/constants';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof Users, private jwtService: JwtService) {}

    private async _createToken(user: IUser): Promise<string> {
        const tokenPayload = { id: user.id, username: user.nameFirst };
        const token = await this.jwtService.signAsync(tokenPayload);
        return token;
    }

    public async createUser(userData: CreateUserDto): Promise<ICreateUserResponse> {
        const isExistUser = await this.userRepository.findOne({ where: { email: userData.email } });
        if (isExistUser) return { status: status.requestError, message: 'User already exists.' };
        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt);
        const response = await this.userRepository.create({ ...userData, password: hashedPassword });
        const user = response.dataValues;
        const token = await this._createToken(user);
        return { user: omitProp('password', user), status: 200, access_token: token };
    }

    public async loginUser(loginData: LoginUserDto): Promise<ILoginUserResponse> {
        const response = await this.userRepository.findOne({ where: { email: loginData.email } });
        if (!response) {
            return { message: 'Email is not registered.', status: status.requestError };
        }
        const user = response.dataValues;
        const match = await compare(loginData.password, user.password);
        if (!match) {
            return { message: 'Incorrect password!', status: status.requestError };
        } else {
            const token = await this._createToken(user);
            return { status: status.success, access_token: token, user: omitProp('password', user) };
        }
    }

    public async updateUserData(id: number, body: UpdateUserDto): Promise<IUpdateUserResponse> {
        const res = await this.userRepository.update(body, { where: { id } });
        if (res[0] === 0) return { status: status.requestError, message: "User's not found" };
        return { status: status.success, message: "User's data updated." };
    }

    public async getAllUsers(): Promise<IUserWithoutPass[]> {
        const users = await this.userRepository.findAll({ attributes: { exclude: ['password', 'updatedAt'] } });
        return users;
    }

    public async getUserData(id: number): Promise<IGetUserResponse> {
        const user = await this.userRepository.findOne({ where: { id }, attributes: { exclude: ['password', 'updatedAt'] } });
        if (!user) return { status: status.requestError, message: "User's not found" };
        else return { status: status.success, user: user.dataValues };
    }

    public async deleteUser(id: number): Promise<IDeleteUserResponse> {
        const res = await this.userRepository.destroy({ where: { id } });
        if (res === 0) return { status: status.requestError, message: "User's not found." };
        else return { status: status.success, message: "User's successfully deleted." };
    }
}

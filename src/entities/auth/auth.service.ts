import { CreateUserDto, LoginUserDto } from '@entities/user/dto';
import { Users } from '@entities/user/users.model';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { USERS_REPOSITORY, status } from 'src/constants';
import { omitProp } from 'src/helpers';
import { ICreateUserResponse, ILoginUserResponse, IUser } from 'src/model';

@Injectable()
export class AuthService {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users, private jwtService: JwtService) {}

    private async _createToken(user: IUser): Promise<string> {
        const tokenPayload = { id: user.id, username: user.nameFirst };
        const token = await this.jwtService.signAsync(tokenPayload);
        return token;
    }

    public async createUser(userData: CreateUserDto): Promise<ICreateUserResponse> {
        const isExistUser = await this.usersRepository.findOne({ where: { email: userData.email } });
        if (isExistUser) return { status: status.requestError, message: 'User already exists.' };
        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt);
        const response = await this.usersRepository.create({ ...userData, password: hashedPassword }, { isNewRecord: true });
        const user = response.dataValues;
        const token = await this._createToken(user);
        return { user: omitProp('password', user), status: 200, access_token: token };
    }

    public async loginUser(loginData: LoginUserDto): Promise<ILoginUserResponse> {
        const response = await this.usersRepository.findOne({ where: { email: loginData.email } });
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
}

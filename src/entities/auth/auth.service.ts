import { CreateUserDto, LoginUserDto } from '@entities/user/dto';
import { Users } from '@entities/user/users.model';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { USERS_REPOSITORY, messages, status } from 'src/constants';
import { omitProp } from 'src/helpers';
import { ICreateUserResponse, ILoginUserResponse, IUser } from 'src/model';
import { TokenService } from 'src/services/token.service';

@Injectable()
export class AuthService {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users, private jwtService: JwtService, private tokenService: TokenService) {}

    public async createUser(userData: CreateUserDto): Promise<ICreateUserResponse> {
        const isExistUser = await this.usersRepository.findOne({ where: { email: userData.email } });
        if (isExistUser) return { status: status.conflict, message: messages.userExists };
        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt);
        const response = await this.usersRepository.create({ ...userData, password: hashedPassword }, { isNewRecord: true });
        const user = response.dataValues;
        const access_token = await this.tokenService.createAccessToken(user.id);
        const refresh_token = await this.tokenService.createRefreshToken(user.id);
        return { user: omitProp('password', user), status: status.success, access_token, refresh_token };
    }

    public async loginUser(loginData: LoginUserDto): Promise<ILoginUserResponse> {
        const response = await this.usersRepository.findOne({ where: { email: loginData.email } });
        if (!response) {
            return { message: messages.userDoesntExist, status: status.unauthorized };
        }
        const user = response.dataValues;
        const match = await compare(loginData.password, user.password);
        if (!match) {
            return { message: messages.incorrectPassword, status: status.unauthorized };
        } else {
            const access_token = await this.tokenService.createAccessToken(user.id);
            const refresh_token = await this.tokenService.createRefreshToken(user.id);
            return { status: status.success, user: omitProp('password', user), access_token, refresh_token };
        }
    }
}

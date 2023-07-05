import { Inject, Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { USERS_REPOSITORY, messages, status } from 'src/constants';
import { IDeleteUserResponse, IGetUserResponse, IUpdateUserResponse, IUserWithoutPass } from 'src/model';
import { TokenService } from 'src/services/token.service';

@Injectable()
export class UsersService {
    private readonly attributes = { exclude: ['password', 'updatedAt'] };

    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users, private tokenService: TokenService) {}

    public async updateUserData(id: number, body: UpdateUserDto): Promise<IUpdateUserResponse> {
        const res = await this.usersRepository.update(body, { where: { id } });
        if (res[0] === 0) return { status: status.conflict, message: messages.userDoesntExist };
        return { status: status.success, message: messages.userDataUpdated };
    }

    public async getAllUsers(): Promise<IUserWithoutPass[]> {
        const users = await this.usersRepository.findAll({ attributes: this.attributes });
        return users;
    }

    public async getUserData(id: number, access_token: string): Promise<IGetUserResponse> {
        try {
            await this.tokenService.verifyAccessToken(access_token);
            const user = await this.usersRepository.findOne({ where: { id }, attributes: this.attributes });
            if (!user) return { status: status.conflict, message: messages.userDoesntExist };
            else return { status: status.success, user: user.dataValues };
        } catch (err) {
            return { status: status.unauthorized, message: messages.accessTokenExpired };
        }
    }

    public async deleteUser(id: number): Promise<IDeleteUserResponse> {
        const res = await this.usersRepository.destroy({ where: { id } });
        if (res === 0) return { status: status.conflict, message: messages.userDoesntExist };
        else return { status: status.success, message: messages.deleted };
    }
}

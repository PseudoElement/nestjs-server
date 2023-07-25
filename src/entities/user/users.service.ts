import { Inject, Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { USERS_REPOSITORY, messages, status } from 'src/constants';
import { IDeleteUserResponse, IGetUserResponse, IUserWithoutPass } from 'src/model';
import { TokenService } from 'src/services/token.service';
import { convertBufferToImg, omitProp } from 'src/helpers';

@Injectable()
export class UsersService {
    private readonly attributes = { exclude: ['password', 'updatedAt'] };

    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users, private tokenService: TokenService) {}

    public async getAllUsers(): Promise<IUserWithoutPass[]> {
        const users = await this.usersRepository.findAll({ attributes: this.attributes });
        const transformedUsers = users.map((user) => ({ ...user, photoSrc: convertBufferToImg(user.photo) }));
        return transformedUsers;
    }

    public async getUserData(id: number, access_token: string): Promise<IGetUserResponse> {
        try {
            await this.tokenService.verifyAccessToken(access_token);
            const user = await this.usersRepository.findOne({ where: { id }, attributes: this.attributes });
            if (!user) return { status: status.conflict, message: messages.userDoesntExist };
            else {
                const transformedUser = omitProp('photo', { ...user.dataValues, photoSrc: convertBufferToImg(user.dataValues.photo) });
                return { status: status.success, user: transformedUser };
            }
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

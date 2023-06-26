import { Inject, Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { USERS_REPOSITORY, status } from 'src/constants';
import { IDeleteUserResponse, IGetUserResponse, IUpdateUserResponse, IUserWithoutPass } from 'src/model';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users) {}

    public async updateUserData(id: number, body: UpdateUserDto): Promise<IUpdateUserResponse> {
        const res = await this.usersRepository.update(body, { where: { id } });
        if (res[0] === 0) return { status: status.requestError, message: "User's not found" };
        return { status: status.success, message: "User's data updated." };
    }

    public async getAllUsers(): Promise<IUserWithoutPass[]> {
        const users = await this.usersRepository.findAll({ attributes: { exclude: ['password', 'updatedAt'] } });
        return users;
    }

    public async getUserData(id: number): Promise<IGetUserResponse> {
        const user = await this.usersRepository.findOne({ where: { id }, attributes: { exclude: ['password', 'updatedAt'] } });
        if (!user) return { status: status.notFound, message: "User's not found" };
        else return { status: status.success, user: user.dataValues };
    }

    public async deleteUser(id: number): Promise<IDeleteUserResponse> {
        const res = await this.usersRepository.destroy({ where: { id } });
        if (res === 0) return { status: status.notFound, message: "User's not found." };
        else return { status: status.success, message: "User's successfully deleted." };
    }
}

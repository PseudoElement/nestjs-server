import { Users } from '@entities/user/users.model';
import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, messages, status } from 'src/constants';
import { convertBufferToImg, omitProp } from 'src/helpers';
import { IChangeUserEmailRes, IChangeUserPasswordRes, IChangeUserPhotoRes } from 'src/model';
import { compare, genSalt, hash } from 'bcrypt';
@Injectable()
export class MyAccountService {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: typeof Users) {}

    public async changeUserPhoto(id: number, buffer: Buffer): Promise<IChangeUserPhotoRes> {
        try {
            const res = await this.usersRepository.update({ photo: buffer.buffer }, { where: { id } });
            const photoSrc = convertBufferToImg(buffer.buffer);
            return { status: status.success, photoSrc };
        } catch (err) {
            return { status: status.requestError, message: err };
        }
    }

    public async changeUserEmail(id: number, newEmail: string): Promise<IChangeUserEmailRes> {
        try {
            const res = await this.usersRepository.update({ email: newEmail }, { where: { id } });
            const user = await this.usersRepository.findOne({ where: { id }, attributes: { exclude: ['password', 'updatedAt'] } });
            const transformedUser = omitProp('photo', { ...user.dataValues, photoSrc: convertBufferToImg(user.dataValues.photo) });
            return { status: status.success, user: transformedUser };
        } catch (err) {
            return { status: status.requestError, message: err };
        }
    }

    public async changeUserPassword(id: number, oldPassword: string, newPassword: string): Promise<IChangeUserPasswordRes> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            const oldHashPassword = user.dataValues.password;
            const match = await compare(oldPassword, oldHashPassword);
            if (!match) return { status: status.unauthorized, message: messages.incorrectOldPassword };
            else {
                const salt = await genSalt(10);
                const hashedPassword = await hash(newPassword, salt);
                await this.usersRepository.update({ password: hashedPassword }, { where: { id } });
                return { status: status.success, message: messages.passwordUpdated };
            }
        } catch (err) {
            return { status: status.requestError, message: err };
        }
    }
}

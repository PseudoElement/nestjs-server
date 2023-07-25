import { Users } from '@entities/user/users.model';
import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, status } from 'src/constants';
import { convertBufferToImg, omitProp } from 'src/helpers';
import { IChangeUserEmailRes, IChangeUserPhotoRes } from 'src/model';

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
}

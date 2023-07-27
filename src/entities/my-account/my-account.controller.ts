import { Body, Controller, Patch, Res, UploadedFile, UseInterceptors, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MyAccountService } from './my-account.service';
import { IChangeUserEmailRequestBody, IChangeUserPasswordRequestBody, IChangeUserPhotoRequestBody } from 'src/model';
import { status } from 'src/constants';

@Controller('account')
export class MyAccountController {
    constructor(private myAccountService: MyAccountService) {}

    @UseInterceptors(FileInterceptor('newPhoto'))
    @Patch('update-photo')
    public async changeUserPhoto(@Body() body: IChangeUserPhotoRequestBody, @Res() res: Response, @UploadedFile() newPhoto: Buffer) {
        const serviceRes = await this.myAccountService.changeUserPhoto(+body.id, newPhoto);
        if (serviceRes.status === status.success) return res.status(200).send({ photoSrc: serviceRes.photoSrc });
        else return res.status(serviceRes.status).send(serviceRes.message);
    }

    @Patch('update-email')
    public async changeUserEmail(@Body() body: IChangeUserEmailRequestBody, @Res() res: Response) {
        const serviceRes = await this.myAccountService.changeUserEmail(+body.id, body.email);
        if (serviceRes.status === status.success) return res.status(200).send({ ...serviceRes.user });
        else return res.status(serviceRes.status).send(serviceRes.message);
    }

    @Patch('update-password')
    public async changeUserPassword(@Headers() headers: Headers, @Body() body: IChangeUserPasswordRequestBody, @Res() res: Response) {
        const id = +headers['user-id'];
        const { message, status } = await this.myAccountService.changeUserPassword(id, body.oldPassword, body.newPassword);
        return res.status(status).send({ message });
    }
}

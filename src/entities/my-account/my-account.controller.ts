import { Body, Controller, Patch, Req, Res, UploadedFile, UseInterceptors, Post, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { MyAccountService } from './my-account.service';
import { IChangeUserEmailRequestBody, IChangeUserPhotoRequestBody } from 'src/model';
import { status } from 'src/constants';

@Controller('account')
export class MyAccountController {
    constructor(private myAccountService: MyAccountService) {}

    @UseInterceptors(FileInterceptor('newPhoto'))
    @Patch('photo')
    public async changeUserPhoto(@Body() body: IChangeUserPhotoRequestBody, @Res() res: Response, @UploadedFile() newPhoto: Buffer) {
        const serviceRes = await this.myAccountService.changeUserPhoto(+body.id, newPhoto);
        if (serviceRes.status === status.success) return res.status(200).send({ photoSrc: serviceRes.photoSrc });
        else return res.status(serviceRes.status).send(serviceRes.message);
    }

    @Patch('email')
    public async changeUserEmail(@Body() body: IChangeUserEmailRequestBody, @Res() res: Response) {
        const serviceRes = await this.myAccountService.changeUserEmail(+body.id, body.newEmail);
        if (serviceRes.status === status.success) return res.status(200).send({ ...serviceRes.user });
        else return res.status(serviceRes.status).send(serviceRes.message);
    }
}

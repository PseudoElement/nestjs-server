import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { status } from 'src/constants';
import { OtherPageService } from './other-page.service';

@Controller('other')
export class OtherPageController {
    constructor(private readonly otherPageService: OtherPageService) {}

    @Get('/results')
    async getAllResults(@Res() res: Response) {
        const results = await this.otherPageService.getLast20Results();
        console.log(typeof results[0].createdAt, results[0].createdAt);
        return res.status(status.success).send(results);
    }
}

import { Controller, Get, Req, Res } from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import { Response, Request } from 'express';
import { status } from 'src/constants';

@Controller('about')
export class AboutPageController {
    constructor(public aboutPageService: AboutPageService) {}

    @Get('/developer-cards')
    async getDeveloperCards(@Req() req: Request, @Res() res: Response) {
        const developers = await this.aboutPageService.getDeveloperCards();
        return res.status(status.success).send(developers);
    }
}

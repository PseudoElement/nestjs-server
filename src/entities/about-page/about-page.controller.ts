import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AboutPageService } from './about-page.service';
import { DeveloperCardDto } from './dto';
import { Response, Request } from 'express';
import { status } from 'src/constants';

@Controller('about')
export class AboutPageController {
    constructor(public abotPageService: AboutPageService) {}

    @Get('/')
    async getAboutPageData(@Req() req: Request, @Res() res: Response) {
        return res.status(status.success).send({ message: 'asd21' });
    }

    @Post('/')
    @UseInterceptors(FileInterceptor('image'))
    async uploadPhoto(@UploadedFile() data: DeveloperCardDto): Promise<void> {
        await this.abotPageService.insertPhoto(data);
    }
}

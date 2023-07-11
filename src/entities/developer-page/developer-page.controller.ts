import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { DeveloperPageService } from './developer-page.service';

@Controller('developers')
export class DeveloperPageController {
    constructor(private developerPageService: DeveloperPageService) {}
    @Get('/:id')
    public async getDeveloperInfo(@Param('id') id: string, @Res() res: Response) {
        const serviceRes = await this.developerPageService.getDeveloperInfo(id);
        return res.status(200).send(serviceRes);
    }
}

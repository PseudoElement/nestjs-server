import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { status } from 'src/constants';

@Controller('products')
export class ProductsPageController {
    @Get('/apps')
    getWebApplications(@Req() req: Request, @Res() res: Response, @Query() query: any) {
        const { params, query: queryParams } = req;
        console.log('PARAMS', params);
        console.log('QUERY_PARAMS', queryParams);
        console.log('QUERY', query);
        return res.status(status.success).send('Hello');
    }
}

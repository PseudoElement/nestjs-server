import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { status } from 'src/constants';
import { IGetWebApplicationsQueryParams } from 'src/model';
import { ProductsPageService } from './products-page.service';

@Controller('products')
export class ProductsPageController {
    constructor(private productsService: ProductsPageService) {}
    @Get('/apps')
    async getWebApplications(@Res() res: Response, @Query() query: IGetWebApplicationsQueryParams) {
        if (!query._limit || !query._page) {
            const apps = await this.productsService.getAllWebApplications();
            return res.status(status.success).send(apps);
        } else {
            const { _limit, _page } = query;
            const apps = await this.productsService.getLimitedApplications({ _limit, _page });
            return res.status(status.success).send(apps);
        }
    }
    @Get('/games')
    async getWebGames(@Res() res: Response, @Query() query: IGetWebApplicationsQueryParams) {
        if (!query._limit || !query._page) {
            const games = await this.productsService.getAllGames();
            return res.status(status.success).send(games);
        } else {
            const { _limit, _page } = query;
            const games = await this.productsService.getLimitedGames({ _limit, _page });
            return res.status(status.success).send(games);
        }
    }
}

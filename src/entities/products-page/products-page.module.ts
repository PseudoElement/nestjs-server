import { Module } from '@nestjs/common';
import { ProductsPageService } from './products-page.service';
import { ProductsPageController } from './products-page.controller';
import { GAMES_REPOSITORY, WEB_APPS_REPOSITORY } from 'src/constants';
import { Applications } from './apps.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Games } from './games.model';

@Module({
    imports: [SequelizeModule.forFeature([Applications, Games])],
    providers: [ProductsPageService, { provide: WEB_APPS_REPOSITORY, useValue: Applications }, { provide: GAMES_REPOSITORY, useValue: Games }],
    controllers: [ProductsPageController],
})
export class ProductsPageModule {}

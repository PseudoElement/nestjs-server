import { Module } from '@nestjs/common';
import { ProductsPageService } from './products-page.service';
import { ProductsPageController } from './products-page.controller';
import { WEB_APPS_REPOSITORY } from 'src/constants';
import { Applications } from './apps.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Applications])],
    providers: [ProductsPageService, { provide: WEB_APPS_REPOSITORY, useValue: Applications }],
    controllers: [ProductsPageController],
})
export class ProductsPageModule {}

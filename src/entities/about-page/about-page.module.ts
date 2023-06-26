import { Module } from '@nestjs/common';
import { AboutPageController } from './about-page.controller';
import { AboutPageService } from './about-page.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeveloperCards } from './about-page.model';
import { DEVELOPER_CARDS_REPOSITORY } from 'src/constants';

@Module({
    imports: [SequelizeModule.forFeature([DeveloperCards])],
    controllers: [AboutPageController],
    providers: [AboutPageService, { provide: DEVELOPER_CARDS_REPOSITORY, useValue: DeveloperCards }],
})
export class AboutPageModule {}

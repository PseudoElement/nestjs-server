import { Module } from '@nestjs/common';
import { DeveloperPageService } from './developer-page.service';
import { DeveloperPageController } from './developer-page.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Developers } from './developer-page.model';
import { DEVELOPERS_REPOSITORY } from 'src/constants';

@Module({
    imports: [SequelizeModule.forFeature([Developers])],
    providers: [DeveloperPageService, { provide: DEVELOPERS_REPOSITORY, useValue: Developers }],
    controllers: [DeveloperPageController],
})
export class DeveloperPageModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RandomWheelResults } from './results.model';
import { OtherPageGateway } from './other-page.gateway';
import { OtherPageService } from './other-page.service';
import { RANDOM_WHEEL_RESULTS_REPOSITORY } from 'src/constants';
import { OtherPageController } from './other-page.controller';

@Module({
    imports: [SequelizeModule.forFeature([RandomWheelResults])],
    providers: [OtherPageGateway, OtherPageService, { provide: RANDOM_WHEEL_RESULTS_REPOSITORY, useValue: RandomWheelResults }],
    controllers: [OtherPageController],
})
export class OtherPageModule {}

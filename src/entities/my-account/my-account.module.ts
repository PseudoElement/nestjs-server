import { Module } from '@nestjs/common';
import { MyAccountController } from './my-account.controller';
import { MyAccountService } from './my-account.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '@entities/user/users.model';
import { USERS_REPOSITORY } from 'src/constants';

@Module({
    controllers: [MyAccountController],
    providers: [MyAccountService, { provide: USERS_REPOSITORY, useValue: Users }],
    imports: [SequelizeModule.forFeature([Users])],
})
export class MyAccountModule {}

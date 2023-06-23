import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USERS_REPOSITORY } from 'src/constants';
import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService, { provide: USERS_REPOSITORY, useValue: Users }],
    exports: [UsersService],
})
export class UsersModule {}

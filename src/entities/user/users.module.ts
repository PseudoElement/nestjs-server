import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { USER_REPOSITORY, jwtConstants } from 'src/constants';
import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '48h' },
        }),
        SequelizeModule.forFeature([Users]),
    ],
    controllers: [UsersController],
    providers: [UsersService, { provide: USER_REPOSITORY, useValue: Users }],
    exports: [UsersService],
})
export class UsersModule {}

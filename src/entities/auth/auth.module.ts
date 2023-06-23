import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { USERS_REPOSITORY, jwtConstants } from 'src/constants';
import { Users } from '@entities/user/users.model';
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
    controllers: [AuthController],
    providers: [AuthService, { provide: USERS_REPOSITORY, useValue: Users }],
    exports: [AuthService],
})
export class AuthModule {}

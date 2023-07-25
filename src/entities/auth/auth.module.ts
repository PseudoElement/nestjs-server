import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { USERS_REPOSITORY } from 'src/constants';
import { Users } from '@entities/user/users.model';
import { TokenService } from 'src/services/token.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, { provide: USERS_REPOSITORY, useValue: Users }, TokenService],
    exports: [AuthService],
})
export class AuthModule {}

import { Body, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { status } from 'src/constants';
import { CreateUserDto, LoginUserDto } from '@entities/user/dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @UseInterceptors(FileInterceptor(''))
    async createUser(@Req() req: Request, @Res() res: Response, @Body() body: CreateUserDto) {
        const response = await this.authService.createUser(body);
        const { status: resStatus, message, user, access_token } = response;
        if (resStatus === status.conflict) return res.status(status.conflict).send({ message });
        else return res.status(status.success).send({ ...user, access_token });
    }

    @Post('/login')
    async loginUser(@Req() req: Request, @Res() res: Response, @Body() body: LoginUserDto) {
        const serviceResponse = await this.authService.loginUser(body);
        const { status: resStatus, message, user, access_token } = serviceResponse;
        if (resStatus === status.notFound) return res.status(status.notFound).send({ message });
        if (resStatus === status.unauthorized) return res.status(status.unauthorized).send({ message });
        else return res.status(status.success).send({ ...user, access_token });
    }
}

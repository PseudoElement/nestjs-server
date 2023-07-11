import { Body, Controller, Post, Req, Res, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { status } from 'src/constants';
import { CreateUserDto, LoginUserDto } from '@entities/user/dto';
import { TokenService } from 'src/services/token.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private tokenService: TokenService) {}

    @Post('/register')
    @UseInterceptors(FileInterceptor(''))
    async createUser(@Req() req: Request, @Res() res: Response, @Body() body: CreateUserDto) {
        const response = await this.authService.createUser(body);
        const { status: resStatus, message, user, access_token, refresh_token } = response;
        if (resStatus === status.conflict) return res.status(status.conflict).send(message);
        else return res.status(status.success).send({ ...user, access_token, refresh_token });
    }

    @Post('/login')
    async loginUser(@Req() req: Request, @Res() res: Response, @Body() body: LoginUserDto) {
        const serviceResponse = await this.authService.loginUser(body);
        const { status: resStatus, message, user, access_token, refresh_token } = serviceResponse;
        if (resStatus === status.unauthorized) return res.status(status.unauthorized).send(message);
        else return res.status(status.success).send({ ...user, access_token, refresh_token });
    }

    @Get('/refresh-token')
    async getNewAccessToken(@Req() req: Request, @Res() res: Response) {
        const refresh_token = req.headers['refresh-token'] as string;
        const userID = req.headers['x-user-id'] as string;
        const serviceRes = await this.tokenService.handleVerifyingRefreshToken(refresh_token, userID);
        if (serviceRes.status === status.unauthorized) return res.status(serviceRes.status).send(serviceRes.message);
        else return res.status(serviceRes.status).send({ access_token: serviceRes.access_token });
    }
}

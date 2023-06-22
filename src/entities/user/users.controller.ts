import { UsersService } from './users.service';
import { Controller, Get, Post, Put, Delete, Patch, Req, Res, UseInterceptors, Param, ParseIntPipe, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { status } from 'src/constants';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get('/')
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        const users = await this.userService.getAllUsers();
        return res.status(status.success).send({ users: users });
    }

    @Get('/:id')
    async getUser(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id', ParseIntPipe) id: number,
        @Param() params: any, //all params(like :id, not queryParams) or req.params
    ) {
        const response = await this.userService.getUserData(id);
        if (response.status === status.requestError) return res.status(status.requestError).send({ message: response.message });
        else return res.status(status.success).send({ user: response.user });
    }

    @Post('/register')
    @UseInterceptors(FileInterceptor(''))
    async createUser(@Req() req: Request, @Res() res: Response, @Body() body: CreateUserDto) {
        const response = await this.userService.createUser(body);
        const { status: resStatus, message, user, access_token } = response;
        if (resStatus === status.requestError) return res.status(status.requestError).send({ message });
        else return res.status(status.success).send({ ...user, access_token });
    }

    @Post('/login')
    async loginUser(@Req() req: Request, @Res() res: Response, @Body() body: LoginUserDto) {
        const serviceResponse = await this.userService.loginUser(body);
        const { status: resStatus, message, user, access_token } = serviceResponse;
        if (resStatus === status.requestError) return res.status(status.requestError).send({ message });
        else return res.status(status.success).send({ ...user, access_token });
    }

    @Put('/:id')
    async updateUser(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
        const response = await this.userService.updateUserData(id, body);
        return res.status(response.status).send({ message: response.message });
    }

    @Patch('/:id')
    async updateUserField(@Req() req: Request, @Res() res: Response) {}

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
        const response = await this.userService.deleteUser(id);
        return res.status(response.status).send({ message: response.message });
    }
}

import { UsersService } from './users.service';
import { Controller, Get, Put, Delete, Req, Res, Param, ParseIntPipe, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
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
        const access_token = req.headers['access-token'] as string;
        const response = await this.userService.getUserData(id, access_token);
        if (response.status === status.unauthorized || response.status === status.conflict) {
            return res.status(response.status).send({ message: response.message });
        } else {
            return res.status(status.success).send({ user: response.user });
        }
    }

    @Put('/:id')
    async updateUser(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
        const response = await this.userService.updateUserData(id, body);
        return res.status(response.status).send({ message: response.message });
    }

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
        const response = await this.userService.deleteUser(id);
        return res.status(response.status).send({ message: response.message });
    }
}

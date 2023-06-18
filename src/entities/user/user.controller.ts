import { UserService } from './user.service';
import { Controller, Get, Post, Put, Delete, Patch, Req, Res, UseInterceptors, Param, ParseIntPipe, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { IUser } from './model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){
    }
    @Get('/')
    async getAllUsers(
        @Req() req: Request,
        @Res() res: Response
    ){
        const users = await this.userService.getAllUsers();
        return res.status(200).send({users: users})
    }

    @Get('/:id')
    async getUser(
        @Req() req: Request,
        @Res() res: Response,
        @Param("id", ParseIntPipe) id: number,
        @Param() params: any//all params(like :id, not queryParams) or req.params
    ){
        const user = await this.userService.getUserData(id);
        return res.status(200).send({user: user})
    }

    @Post('/register')
    @UseInterceptors(FileInterceptor(""))
    async createUser(
        @Req() req: Request,
        @Res() res: Response
    ){
        const isValid = !!req.body.nameLast
        if(!isValid) return res.status(400).json({message: "Input last name."})
        await this.userService.createUser(req.body)

        return res.status(200).json({message: "User successfully created."})
    }

    @Post("/login")
    async loginUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: LoginUserDto
    ){
        const message = await this.userService.onLoginUser(body);
        return res.status(200).send({message})
    }

    @Put('/:id')
    async updateUser(
        @Res() res: Response,
        @Param("id", ParseIntPipe) id: number,
        @Body() body: UpdateUserDto
    ){
        this.userService.updateUserData(id, body)
        return res.status(200).send({message: "User data successfully changed."})
    }

    @Patch('/:id')
    async updateUserField(
        @Req() req: Request,
        @Res() res: Response
    ){
    }

    @Delete('/:id')
    async deleteUser(
        @Param("id", ParseIntPipe) id: number,
        @Req() req: Request,
        @Res() res: Response
    ){
        const message = await this.userService.deleteUser(id)
        return res.status(200).send({message})
    }
}

import { Controller, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { status } from 'src/constants';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Get('/messages')
    async getMessagesFromDB(@Res() res: Response) {
        const messages = await this.chatService.getAllMessages();
        return res.status(status.success).send(messages);
    }
}

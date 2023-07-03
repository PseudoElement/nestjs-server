import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/constants';
import { Messages } from './chat.model';
import { MessagesDto } from './dto/MessageDto';

@Injectable()
export class ChatService {
    constructor(@Inject(MESSAGES_REPOSITORY) private readonly messagesRepo: typeof Messages) {}

    public async saveMessage(body: MessagesDto): Promise<void> {
        const res = await this.messagesRepo.create(body);
        console.log('RES', res);
    }

    public async getAllMessages(): Promise<MessagesDto[]> {
        const messages = await this.messagesRepo.findAll({ attributes: { exclude: ['updatedAt'] } });
        return messages;
    }
}

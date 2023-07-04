import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/constants';
import { Messages } from './chat.model';
import { MessagesDto } from './dto/MessageDto';
import { omitProp } from 'src/helpers';
import { IMessageFromDB } from 'src/model';

@Injectable()
export class ChatService {
    private readonly attributes = { exclude: ['updatedAt'] };

    constructor(@Inject(MESSAGES_REPOSITORY) private readonly messagesRepo: typeof Messages) {}

    public async saveMessage(body: MessagesDto): Promise<IMessageFromDB> {
        const res = await this.messagesRepo.create(body, { isNewRecord: true });
        const message = omitProp('updatedAt', res.dataValues);
        return message;
    }

    public async getAllMessages(): Promise<MessagesDto[]> {
        const messages = await this.messagesRepo.findAll({ attributes: this.attributes });
        return messages;
    }

    public async checkMessageNumberInDB() {
        const res = await this.messagesRepo.findAll();
        return res.length;
    }

    public async deleteOldestMessageFromDB() {
        const oldestMessage = await this.messagesRepo.findOne({
            order: [['createdAt', 'ASC']],
        });
        console.log(oldestMessage);
        if (oldestMessage) await oldestMessage.destroy();
    }
}

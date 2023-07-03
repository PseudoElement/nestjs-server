import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Messages } from './chat.model';
import { MESSAGES_REPOSITORY } from 'src/constants';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
    imports: [SequelizeModule.forFeature([Messages])],
    providers: [ChatGateway, { provide: MESSAGES_REPOSITORY, useValue: Messages }, ChatService],
    controllers: [ChatController],
})
export class ChatModule {}

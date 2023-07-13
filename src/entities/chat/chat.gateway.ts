import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { MessagesDto } from './dto/MessageDto';
import { ChatService } from './chat.service';
import { omitProp } from 'src/helpers';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {
    constructor(private chatService: ChatService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('messageFromClient')
    async handleMessage(@MessageBody() body: MessagesDto, @ConnectedSocket() client: Socket): Promise<void> {
        const message = await this.chatService.saveMessage(body);
        const messagesNumber = await this.chatService.checkMessagesNumberInDB();
        if (messagesNumber > 100) {
            await this.chatService.deleteOldestMessageFromDB();
            this.server.emit('deleteOldestMessage');
        }
        this.server.emit('messageFromServer', message);
    }

    async onModuleInit() {
        console.log('GATEWAY IS OPEN');
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }
}

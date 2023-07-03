import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { MessagesDto } from './dto/MessageDto';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {
    constructor(private chatService: ChatService) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('messageFromClient')
    async handleMessage(@MessageBody() body: MessagesDto, @ConnectedSocket() client: Socket): Promise<void> {
        console.log(body);
        await this.chatService.saveMessage(body);
        this.server.emit('messageFromServer', {
            body,
        });
    }

    async onModuleInit() {
        console.log('GATEWAY IS OPEN');
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }
}

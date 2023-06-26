import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnModuleInit {
    constructor() {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('messageFromClient')
    handleMessage(@MessageBody() body: string, @ConnectedSocket() client: Socket): void {
        console.log(body);
        this.server.emit('messageFromServer', {
            body,
        });
    }

    onModuleInit() {
        console.log('GATEWAY IS OPEN');
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }
}

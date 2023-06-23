import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatGateway {
    @SubscribeMessage('message')
    handleMessage(@MessageBody() body: string, @ConnectedSocket() client: Socket): WsResponse<string> {
        console.log(body);
        const event = 'message';
        return { event, data: body };
    }
}

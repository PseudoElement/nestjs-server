import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IWinResult } from 'src/model';
import { OtherPageService } from './other-page.service';

@WebSocketGateway()
export class OtherPageGateway {
    constructor(private readonly otherPageService: OtherPageService) {}
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('resultFromClient')
    public async handleMessage(@MessageBody() body: IWinResult, @ConnectedSocket() client: Socket): Promise<void> {
        const newResultBody = await this.otherPageService.addNewResultInDB(body);
        this.server.emit('resultFromServer', newResultBody);
    }
}

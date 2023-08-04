import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Server } from 'ws'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { WsAuthGuard } from './ws.guard'

@WebSocketGateway({
  path: '/ws',
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
// @UseGuards(WsAuthGuard)
// @UseGuards(AuthGuard('jwt'))
export class WsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('events')
  @UseGuards(WsAuthGuard)
  findAll(client: any, @MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    )
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data
  }
}

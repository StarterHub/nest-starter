import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
} from '@nestjs/websockets'
import { UseFilters, UseGuards } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Server, Socket } from 'socket.io'
import { from, map, Observable } from 'rxjs'
import { WsAuthGuard } from './ws.guard'
import { WebsocketExceptionFilter } from '../../common/filters/ws-exception.filter'

@WebSocketGateway({
  // for socket-io
  // http://127.0.0.1:3001/ws
  namespace: 'ws',
  // for ws
  // ws://127.0.0.1:3001/ws
  // path: '/ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket'],
})
@UseFilters(new WebsocketExceptionFilter())
export class WsGateway implements OnGatewayInit<Server> {
  @WebSocketServer()
  server: Server

  constructor(private readonly i18n: I18nService) {}

  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): string {
    console.log('this.i18n', this.i18n.t, I18nContext.current())
    return this.i18n.t('common.HELLO', { lang: I18nContext.current().lang })
  }

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any): string {
    return this.i18n.t('common.NEW', {
      args: { name: 'Kimmy' },
      lang: I18nContext.current().lang,
    })
  }

  @SubscribeMessage('events')
  @UseGuards(WsAuthGuard)
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    )
  }

  @SubscribeMessage('identity')
  async identity(socket: Socket, @MessageBody() data: number): Promise<number> {
    return data
  }

  afterInit(server: Server): any {
    // console.log('server', server)
  }
}

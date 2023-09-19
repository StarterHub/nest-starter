import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'
import { UseGuards } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'
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

  constructor(private readonly i18n: I18nService) {}

  @SubscribeMessage('hello')
  hello(client: any, @MessageBody() data: any): string {
    console.log('this.i18n', this.i18n.t, I18nContext.current())
    return this.i18n.t('common.HELLO', { lang: I18nContext.current().lang })
  }

  @SubscribeMessage('hello2')
  hello2(client: any, @MessageBody() data: any): string {
    return this.i18n.t('common.NEW', {
      args: { name: 'Kimmy' },
      lang: I18nContext.current().lang,
    })
  }

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

import { Catch, ArgumentsHost } from '@nestjs/common'
import { WsException, BaseWsExceptionFilter } from '@nestjs/websockets'

@Catch(WsException)
export class WebsocketExceptionFilter extends BaseWsExceptionFilter<WsException> {
  catch(exception: WsException, host: ArgumentsHost) {
    console.log('exception', exception)
    super.catch(exception, host)
  }
}

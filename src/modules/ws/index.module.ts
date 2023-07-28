import { Module } from '@nestjs/common'
import { WsGateway } from './index.gateway'

@Module({
  providers: [WsGateway],
})
export class WsModule {}

import { Module } from '@nestjs/common'
import { EventsGateway } from './index.gateway'

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}

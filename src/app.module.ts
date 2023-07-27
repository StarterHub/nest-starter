import { Module } from '@nestjs/common'
import { EventsModule, TestModule } from './modules'

@Module({
  imports: [EventsModule, TestModule],
})
export class AppModule {}

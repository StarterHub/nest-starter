import { Module } from '@nestjs/common'
import { HttpController } from './index.controller'
import { HttpService } from './index.service'

@Module({
  imports: [],
  controllers: [HttpController],
  providers: [HttpService],
})
export class HttpModule {}

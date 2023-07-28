import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)).setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe())
  app.useWebSocketAdapter(new WsAdapter(app))
  await app.listen(3001)
}

bootstrap()

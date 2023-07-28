import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)).setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: '__version__',
    defaultVersion: '1',
  })
  app.useWebSocketAdapter(new WsAdapter(app))

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1')
    .addTag('cats')
    .addGlobalParameters({
      name: '__version__',
      in: 'header',
    })
    .build()
  const document = SwaggerModule.createDocument(app, config, {  })
  SwaggerModule.setup('api', app, document)

  await app.listen(3001)
}

bootstrap()

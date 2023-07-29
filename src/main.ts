import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import csurf from 'tiny-csrf'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser('cookie-parser-secret'))
  app.use(session({ secret: 'keyboard cat' }))
  app.use(csurf('123456789iamasecret987654321look'))

  // Use Helmet
  app.use(helmet())
  // Enable Cors
  app.enableCors()
  app.setGlobalPrefix('/api')
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
  const document = SwaggerModule.createDocument(app, config, {})
  SwaggerModule.setup('api', app, document)

  await app.listen(3001)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()

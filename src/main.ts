import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser('cookie-parser-secret'))
  app.use(
    session({
      secret: 'keyboard cat',
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax', //csrf security
      },
    }),
  )

  // Use Helmet
  app.use(helmet())
  // Enable Cors
  app.enableCors()
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: '__version__',
    defaultVersion: '1',
  })
  app.useWebSocketAdapter(new IoAdapter(app))

  const config = new DocumentBuilder()
    .setTitle('Api')
    .setDescription('The API description')
    .setVersion('1')
    .addTag('users')
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

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  I18nModule,
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  QueryResolver,
  CookieResolver,
  HeaderResolver,
} from 'nestjs-i18n'
import { join } from 'path'
import * as yaml from 'js-yaml'
import { readFileSync } from 'fs'
import {
  CoreModule,
  UsersModule,
  AuthModule,
  WsModule,
  GraphQLModule as CustomGraphQLModule,
  HealthModule,
} from './modules'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          return yaml.load(
            readFileSync(join(__dirname, '/config/config.yaml'), 'utf8'),
          ) as Record<string, any>
        },
      ],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('fallback_language'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
    CoreModule,
    UsersModule,
    AuthModule,
    CustomGraphQLModule,
    HealthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: (ctx: any) => ctx,
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    WsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

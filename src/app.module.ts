import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import {
  WsModule,
  HttpModule as CustomHttpModule,
  GraphQLModule as CustomGraphQLModule,
  HealthModule,
} from './modules'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'

@Module({
  imports: [
    WsModule,
    CustomHttpModule,
    CustomGraphQLModule,
    HealthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
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
  ],
})
export class AppModule {}

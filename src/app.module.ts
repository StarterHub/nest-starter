import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import {
  UsersModule,
  AuthModule,
  WsModule,
  GraphQLModule as CustomGraphQLModule,
  HealthModule,
} from './modules'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    WsModule,
    CustomGraphQLModule,
    HealthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
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

import { NestFactory } from '@nestjs/core'
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { printSchema } from 'graphql'
import { writeFileSync } from 'fs'
import { join } from 'path'

import { DateScalar } from './common/scalars/date.scalar'
import { GraphQLResolver } from './modules'

const resolvers = [
  // Your resolvers here
  GraphQLResolver,
]

const scalars = [
  // Your scalars here
  DateScalar,
]

const bootstrap = async () => {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule)
  await app.init()

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
  const schema = await gqlSchemaFactory.create(resolvers, scalars)

  writeFileSync(join(process.cwd(), '/schema.gql'), printSchema(schema))
}

bootstrap()

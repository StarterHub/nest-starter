import { Module } from '@nestjs/common'
import { DateScalar } from '../../common/scalars/date.scalar'
import { GraphQLResolver } from './index.resolver'
import { GraphQLService } from './index.service'

@Module({
  providers: [GraphQLResolver, GraphQLService, DateScalar],
})
export class GraphQLModule {}

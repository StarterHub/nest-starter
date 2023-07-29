import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { DateScalar } from '../../common/scalars/date.scalar'
import { GraphQLResolver } from './graphql.resolver'
import { GraphQLService } from './graphql.service'
import { UsersModule, UsersService } from '../users'
import { jwtConstants } from '../auth/constants'
import { AuthService } from '../auth'
import { LocalStrategy } from '../auth/strategies/local.strategy'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 24 * 60 * 60 },
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GraphQLResolver,
    GraphQLService,
    DateScalar,
  ],
})
export class GraphQLModule {}

import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { WsGateway } from './ws.gateway'
import { UsersModule, UsersService } from '../users'
import { AuthService } from '../auth'
import { LocalStrategy } from '../auth/strategies/local.strategy'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'
import { jwtConstants } from '../auth/constants'
import { WsJwtStrategy } from '../auth/strategies/ws-jwt.strategy'

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
    // JwtStrategy,
    WsJwtStrategy,
    WsGateway,
  ],
})
export class WsModule {}

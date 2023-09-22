import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { WsGateway } from './ws.gateway'
import { UsersModule, UsersService } from '../users'
import { AuthService } from '../auth'
import { jwtConstants } from '../auth/constants'

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
  providers: [UsersService, AuthService, WsGateway],
})
export class WsModule {}

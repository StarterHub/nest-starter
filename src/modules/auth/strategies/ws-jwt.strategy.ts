import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { WsException } from '@nestjs/websockets'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User, UsersService } from '../../users'
import { jwtConstants } from '../constants'

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: { username: string }): Promise<User> {
    const { username } = payload
    try {
      return this.usersService.findOne(username)
    } catch (error) {
      throw new WsException('Unauthorized access')
    }
  }
}

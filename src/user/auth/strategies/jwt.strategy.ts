import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../interface/jwt-payload.interface';
import GraphqlException from 'src/exceptions/graphql.exception';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.UserService.validateJwtPayload(payload);

    if (!user) {
      throw new GraphqlException(
        403,
        'Could not log-in with the provided credentials',
      );
    }

    return user;
  }
}

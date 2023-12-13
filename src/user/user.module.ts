import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
require('dotenv').config();

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JwtSecret,
      signOptions: {
        expiresIn: '600000s',
      },
    }),
  ],
  controllers: [],
  providers: [UserService, UserResolver, JwtStrategy],
})
export class UserModule {}

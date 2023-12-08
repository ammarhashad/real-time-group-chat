import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

require('dotenv').config();

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JwtSecret,
      signOptions: {
        expiresIn: '600000s',
      },
    }),
  ],
  controllers: [],
  providers: [
    UserService,
    UserResolver,
    { provide: 'UserTable', useValue: User },
  ],
})
export class UserModule {}

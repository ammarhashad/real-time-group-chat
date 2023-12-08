import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    UserService,
    UserResolver,
    { provide: 'UserTable', useValue: User },
  ],
})
export class UserModule {}

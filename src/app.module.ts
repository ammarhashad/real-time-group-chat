import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [UserModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

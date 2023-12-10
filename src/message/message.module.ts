import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageService, { provide: 'MessageTable', useValue: Message }, MessageResolver],
})
export class MessageModule {}

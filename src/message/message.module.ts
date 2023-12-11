import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { MessageResolver } from './message.resolver';
import { PubsubModule } from 'src/pubsub/pubsub.module';

@Module({
  providers: [
    MessageService,
    { provide: 'MessageTable', useValue: Message },
    MessageResolver,
  ],
})
export class MessageModule {}

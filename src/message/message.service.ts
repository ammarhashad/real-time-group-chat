import { Inject, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageInput } from './dto/message.dto';
import { User } from 'src/user/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import {
  PubSubPayload,
  PubsubType,
} from 'src/pubsub/interfaces/pubsub.interface';

@Injectable()
export class MessageService {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  async sendMessage(messageInput: MessageInput, user: User) {
    try {
      const newMessage = new Message({
        message: messageInput.message,
        groupId: messageInput.groupId,
        userId: user.id,
      });
      await newMessage.save();
      let payload: PubSubPayload = {
        type: PubsubType.Message,
        ...newMessage.toJSON(),
      };
      await this.pubSub.publish('newAction', { listen: payload });
      return newMessage;
    } catch (err) {
      console.log(err);
    }
  }
}

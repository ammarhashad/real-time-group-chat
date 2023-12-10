import { Inject, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageInput } from './dto/message.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MessageTable')
    private readonly MessageTable: typeof Message,
  ) {}

  async sendMessage(messageInput: MessageInput, user: User) {
    try {
      const newMessage = new Message({
        message: messageInput.message,
        groupId: messageInput.groupId,
        userId: user.id,
      });
      return newMessage.save();
    } catch (err) {
      console.log(err);
    }
  }
}

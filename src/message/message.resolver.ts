import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt.guard';
import { LoggedInUser } from 'src/decorators/loggedInUser.decorator';
import { User } from 'src/user/entities/user.entity';
import { MessageInput } from './dto/message.dto';
import { Message } from './entities/message.entity';

@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @LoggedInUser() user: User,
    @Args('MessageInput') messageInput: MessageInput,
  ) {
    return this.messageService.sendMessage(messageInput, user);
  }
}

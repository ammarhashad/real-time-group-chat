import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class MessageInput {
  @Field(() => String)
  @IsNotEmpty()
  message: string;

  @Field(() => String)
  @IsNotEmpty()
  groupId: string;
}

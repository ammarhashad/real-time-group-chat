import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export enum PubsubType {
  Notification = 'Notification',
  Message = 'Message',
}

@ObjectType()
export class PubSubPayload {
  @Field(() => String)
  @IsNotEmpty()
  userId: string;

  @Field(() => String)
  @IsNotEmpty()
  groupId: string;

  @Field(() => String)
  @IsNotEmpty()
  type: PubsubType;

  @Field(() => String)
  @IsNotEmpty()
  message: string;

  @Field(() => GraphQLISODateTime)
  @IsNotEmpty()
  createdAt: Date;
}

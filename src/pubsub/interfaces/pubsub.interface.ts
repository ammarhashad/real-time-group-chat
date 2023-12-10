import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

enum DispatchType {
  Notifaction = 'Notifacation',
  Message = 'Message',
}

@ObjectType()
export class Dispatch {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  groupId: string;

  @Field(() => DispatchType)
  type: DispatchType;

  @Field(() => String)
  message: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

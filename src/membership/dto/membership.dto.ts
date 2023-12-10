import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class MembershipInput {
  @Field(() => String)
  @IsNotEmpty()
  groupId: string;
}

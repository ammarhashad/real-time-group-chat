import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewGroupInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}

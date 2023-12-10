import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewGroupInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}

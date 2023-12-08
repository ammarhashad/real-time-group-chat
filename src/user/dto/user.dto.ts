import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field(() => String)
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

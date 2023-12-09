import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field(() => String)
  @MaxLength(50)
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

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @MaxLength(8)
  @IsNotEmpty()
  password: string;
}

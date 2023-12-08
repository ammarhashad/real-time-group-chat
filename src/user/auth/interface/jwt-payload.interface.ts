import { Field, ObjectType } from '@nestjs/graphql';

export interface JwtPayload {
  id: string;
  expiration?: Date;
}

@ObjectType()
export class token {
  @Field(() => String)
  token: string;
}

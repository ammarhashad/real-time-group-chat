import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  IsDate,
  IsEmail,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
@ObjectType()
export class User extends Model<User> {
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  @Field(() => ID)
  id: string;

  @Column
  @Unique
  @IsEmail
  @Field(() => String)
  email: string;

  @Column
  @Field(() => String)
  name: string;

  @Column
  @Field(() => String)
  surname: string;

  @Column
  @IsDate
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

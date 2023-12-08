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

@Table({ tableName: 'User' })
@ObjectType()
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  @Field(() => ID)
  id: string;

  @Unique
  @IsEmail
  @Column
  @Field(() => String)
  email: string;

  @Column
  @Field(() => String)
  name: string;

  @Column
  @Field(() => String)
  password: string;

  @IsDate
  @Column
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

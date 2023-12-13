import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from '../../group/entities/group.entity';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'Message' })
@ObjectType()
export class Message extends Model<Message> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  @Field(() => ID)
  id: string;

  @Column
  @Field(() => String)
  message: string;

  @Field(() => String)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
  })
  userId: string;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;

  @Field(() => String)
  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    field: 'group_id',
  })
  groupId: string;

  @Field(() => Group)
  @BelongsTo(() => Group)
  group: Group;

  @Field(() => GraphQLISODateTime)
  @Column({ type: DataType.DATE })
  createdAt: Date;
}

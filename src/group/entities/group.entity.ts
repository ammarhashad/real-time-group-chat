import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsDate,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'Group' })
@ObjectType()
export class Group extends Model<Group> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  @Field(() => ID)
  id: string;

  @Column
  @Field(() => String)
  name: string;

  @Field(() => String)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
  })
  createdBy: string;

  @IsDate
  @Column
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;
}

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
import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';

export enum MembershipType {
  Member = 'Member',
  Admin = 'Admin',
}

@Table({ tableName: 'Membership' })
@ObjectType()
export class Membership extends Model<Membership> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
  })
  member: string;

  @Field(() => String)
  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    field: 'group_id',
  })
  groupId: string;

  @Field(() => String)
  @Column({ type: DataType.ENUM(MembershipType.Admin, MembershipType.Member) })
  type: MembershipType;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;

  @Field(() => Group)
  @BelongsTo(() => Group)
  group: Group;

  @Field(() => GraphQLISODateTime)
  @Column({ type: DataType.DATE })
  createdAt: Date;
}

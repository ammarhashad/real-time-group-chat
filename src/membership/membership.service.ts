import { Inject, Injectable } from '@nestjs/common';
import { Membership, MembershipType } from './entities/membership.entity';
import { MembershipInput } from './dto/membership.dto';
import { User } from '../user/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';
import {
  PubSubPayload,
  PubsubType,
} from '../pubsub/interfaces/pubsub.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(Membership)
    private readonly MembershipTable: typeof Membership,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async joinGroup(
    newMembershipInput: MembershipInput,
    user: User,
  ): Promise<Membership> {
    try {
      const membership = new Membership({
        groupId: newMembershipInput.groupId,
        userId: user.id,
        type: MembershipType.Member,
      });
      await membership.save();

      let payload: PubSubPayload = {
        ...membership.toJSON(),
        userId: user.id,
        message: `${user.name} has joined group`,
        type: PubsubType.Notification,
      };
      this.pubSub.publish('newAction', { listen: payload });

      return membership;
    } catch (err) {
      console.log(err);
    }
  }

  async leaveGroup(membershipInput: MembershipInput) {}

  async getMembershipsByUser(user: User): Promise<Membership[]> {
    try {
      const memberships = await this.MembershipTable.findAll<Membership>({
        where: { userId: user.id },
        include: ['user', 'group'],
      });
      return memberships;
    } catch (err) {
      console.log(err);
    }
  }

  async getMembershipsByGroup(
    membershipInput: MembershipInput,
  ): Promise<Membership[]> {
    try {
      const memberships: Membership[] =
        await this.MembershipTable.findAll<Membership>({
          where: { groupId: membershipInput.groupId },
          include: 'user',
        });
      return memberships;
    } catch (err) {
      console.log(err);
    }
  }
}

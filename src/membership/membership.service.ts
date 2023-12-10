import { Inject, Injectable } from '@nestjs/common';
import { Membership, MembershipType } from './entities/membership.entity';
import { MembershipInput } from './dto/membership.dto';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class MembershipService {
  constructor(
    @Inject('MembershipTable')
    private readonly MembershipTable: typeof Membership,
  ) {}

  async joinGroup(
    newMembershipInput: MembershipInput,
    user: User,
  ): Promise<Membership> {
    try {
      const membership = new Membership({
        groupId: newMembershipInput.groupId,
        member: user.id,
        type: MembershipType.Member,
        createdAt: new Date(),
      });
      return membership.save();
    } catch (err) {
      console.log(err);
    }
  }

  async getMembershipsByUser(user: User): Promise<Membership[]> {
    try {
      const memberships = await this.MembershipTable.findAll<Membership>({
        where: { member: user.id },
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

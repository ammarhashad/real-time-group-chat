import { Injectable } from '@nestjs/common';
import { Group } from './entities/group.entity';
import { User } from '../user/entities/user.entity';
import { NewGroupInput } from './dto/group.dto';
import {
  Membership,
  MembershipType,
} from '../membership/entities/membership.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group)
    private readonly GroupTable: typeof Group,
  ) {}

  async createNewGroup(
    user: User,
    newGroupInput: NewGroupInput,
  ): Promise<Group> {
    try {
      const newGroup = new Group({
        name: newGroupInput.name,
        createdAt: new Date(),
      });
      await newGroup.save();
      const newMembership = new Membership({
        userId: user.id,
        groupId: newGroup.id,
        type: MembershipType.Admin,
        createdAt: new Date(),
      });
      await newMembership.save();
      return newGroup;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllGroups(): Promise<Group[]> {
    try {
      const AllGroups = await this.GroupTable.findAll<Group>({
        include: 'user',
      });
      return AllGroups;
    } catch (err) {
      console.log(err);
    }
  }
}

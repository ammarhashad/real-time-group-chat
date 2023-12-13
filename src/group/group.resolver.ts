import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/guards/jwt.guard';
import { LoggedInUser } from '../decorators/loggedInUser.decorator';
import { User } from '../user/entities/user.entity';
import { NewGroupInput } from './dto/group.dto';

@Resolver()
export class GroupResolver {
  constructor(private groupService: GroupService) {}

  //   Queries
  @Query(() => [Group])
  getAllGroups() {
    return this.groupService.getAllGroups();
  }

  //   Mutations
  @Mutation(() => Group)
  @UseGuards(JwtAuthGuard)
  createNewGroup(
    @LoggedInUser() user: User,
    @Args('NewGroup') newGroupInput: NewGroupInput,
  ) {
    return this.groupService.createNewGroup(user, newGroupInput);
  }
}

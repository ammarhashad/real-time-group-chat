import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt.guard';
import { LoggedInUser } from 'src/decorators/loggedInUser.decorator';
import { User } from 'src/user/entities/user.entity';
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

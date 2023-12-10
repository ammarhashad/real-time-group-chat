import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MembershipService } from './membership.service';
import { Membership } from './entities/membership.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/auth/guards/jwt.guard';
import { MembershipInput } from './dto/membership.dto';
import { LoggedInUser } from 'src/decorators/loggedInUser.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class MembershipResolver {
  constructor(private membershipService: MembershipService) {}

  @Query(() => [Membership])
  @UseGuards(JwtAuthGuard)
  getMembershipsByUser(@LoggedInUser() user: User) {
    return this.membershipService.getMembershipsByUser(user);
  }

  @Query(() => [Membership])
  @UseGuards(JwtAuthGuard)
  getMembershipsByGroup(
    @Args('MembershipInput') membershipInput: MembershipInput,
  ) {
    return this.membershipService.getMembershipsByGroup(membershipInput);
  }

  @Mutation(() => Membership)
  @UseGuards(JwtAuthGuard)
  joinGroup(
    @Args('GroupID') membershipInput: MembershipInput,
    @LoggedInUser() user: User,
  ) {
    return this.membershipService.joinGroup(membershipInput, user);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { LoginInput, NewUserInput } from './dto/user.dto';
import { AuthToken } from './auth/interface/jwt-payload.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { LoggedInUser } from '../decorators/loggedInUser.decorator';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getUser(@LoggedInUser() user: User) {
    return user;
  }

  @Mutation(() => AuthToken)
  loginUser(@Args('LoginArgs') loginInput: LoginInput) {
    return this.userService.login(loginInput);
  }

  @Mutation(() => AuthToken)
  registerUser(@Args('UserArgs') newUserInput: NewUserInput) {
    return this.userService.register(newUserInput);
  }
}

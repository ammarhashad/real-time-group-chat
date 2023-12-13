import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { LoginInput, NewUserInput } from './dto/user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import GraphqlException from '../exceptions/graphql.exception';
import { AuthToken, JwtPayload } from './auth/interface/jwt-payload.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly UserTable: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    newUserInput: NewUserInput,
  ): Promise<AuthToken | GraphqlException> {
    try {
      // check if user is already registered
      let user = await this.UserTable.findOne<User>({
        where: { email: newUserInput.email },
      });
      if (user) {
        return new GraphqlException(403, 'Email is already registered');
      }
      //   hash password
      const salt = await genSalt(10);
      const hashed = await hash(newUserInput.password, salt);
      //   create new user
      let newUser = new User({
        ...newUserInput,
        password: hashed,
      });
      await newUser.save();

      // token expiration
      let expiration = new Date();
      expiration.setTime(expiration.getTime() + 600000);
      // new token payload
      let payload: JwtPayload = {
        id: newUser.id,
        expiration,
      };
      // generate and return token
      let token = this.jwtService.sign(payload);

      return { token };
    } catch (err) {
      console.log(err);
    }
  }

  async login(loginInput: LoginInput): Promise<AuthToken | GraphqlException> {
    try {
      // find user by email
      const user = await this.UserTable.findOne<User>({
        where: { email: loginInput.email },
      });
      //   if user not found
      if (!user) {
        return new GraphqlException(404, 'Email is not registered');
      }
      //   check user's password
      const isMatch = await compare(loginInput.password, user.password);
      if (!isMatch) {
        return new GraphqlException(403, 'Password is wrong');
      }

      //   token expiration
      let expiration = new Date();
      expiration.setTime(expiration.getTime() + 600000);
      // new token payload
      let payload: JwtPayload = {
        id: user.id,
        expiration,
      };
      // assign and return token
      let token = this.jwtService.sign(payload);

      return { token };
    } catch (err) {
      console.log(err);
    }
  }

  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<User | GraphqlException> {
    try {
      const user = await this.UserTable.findByPk<User>(payload.id);
      if (!user) {
        return new GraphqlException(500, "Can't Authorize User");
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

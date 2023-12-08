import { HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { NewUserInput } from './dto/user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserTable')
    private readonly UserTable: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(newUserInput: NewUserInput) {
    try {
      // check if user is already registered
      let user = await this.UserTable.findOne<User>({
        where: { email: newUserInput.email },
      });
      if (user) {
        throw new HttpException('Email is already registered', 403);
      }
      const salt = await genSalt(10);
      const hashed = await hash(newUserInput.password, salt);
      let newUser = new User({
        ...newUserInput,
        password: hashed,
      });
      let expiration: Date;
      expiration = new Date();
      expiration.setTime(expiration.getTime() + 600000);
      await newUser.save();

      let token = this.jwtService.sign({ id: newUser.id, expiration });

      return { token };
    } catch (err) {
      console.log(err);
    }
  }
}

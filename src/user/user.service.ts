import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { NewUserInput } from './dto/user.dto';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserTable')
    private readonly UserTable: typeof User,
  ) {}
}

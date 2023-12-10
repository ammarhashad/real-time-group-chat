import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipResolver } from './membership.resolver';
import { Membership } from './entities/membership.entity';
import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [
    MembershipService,
    MembershipResolver,
    { provide: 'MembershipTable', useValue: Membership },
    { provide: 'GroupTable', useValue: Group },
    { provide: 'UserTable', useValue: User },
  ],
})
export class MembershipModule {}

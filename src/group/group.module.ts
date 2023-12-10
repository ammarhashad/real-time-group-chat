import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { GroupResolver } from './group.resolver';
import { Membership } from 'src/membership/entities/membership.entity';

@Module({
  providers: [
    GroupService,
    { provide: 'GroupTable', useValue: Group },
    { provide: 'MembershipTable', useValue: Membership },
    GroupResolver,
  ],
})
export class GroupModule {}

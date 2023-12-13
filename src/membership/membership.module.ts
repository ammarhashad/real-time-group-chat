import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipResolver } from './membership.resolver';
import { Membership } from './entities/membership.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Membership])],
  providers: [MembershipService, MembershipResolver],
})
export class MembershipModule {}

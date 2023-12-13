import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { GroupResolver } from './group.resolver';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}

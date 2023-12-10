import { Sequelize } from 'sequelize-typescript';
import { Group } from 'src/group/entities/group.entity';
import { Membership } from 'src/membership/entities/membership.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'ammar',
        password: 'ammarhashad',
        database: 'postgres',
      });
      sequelize.addModels([User, Group, Membership]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

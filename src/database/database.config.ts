import { SequelizeModuleOptions } from '@nestjs/sequelize';
require('dotenv');
export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DatabaseUsername,
  password: process.env.DatabasePassword,
  database: process.env.Database,
  autoLoadModels: true,
  synchronize: false,
};

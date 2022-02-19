// configuration for db connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: 'root',
  port: 3306,
  host: 'localhost',
  type: 'mysql',
  database: 'tasksmanagerversion1',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
};

import "dotenv/config.js";
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
console.log( __dirname + '/src/entities/*{.ts,.js}')
function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [__dirname + '/src/entities/*{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  }
  return {
    name: 'default',
    type: 'mysql',
    database: 'quiz',
    host: 'localhost',
    port: Number(3306),
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  }
}

export { ormConfig };

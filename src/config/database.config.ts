import { resolve } from "path";
import { DataSourceOptions } from "typeorm";

export const databaseConfig = (): DataSourceOptions => ({
    type: 'postgres' ,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [ resolve(__dirname, '..', 'migrations', '*{.ts,.js}') ],
});
import { DataSource } from "typeorm";
import { databaseConfig } from "./database.config";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
    envFilePath: '.env'
});

export const AppDataSourceOptions = new DataSource( databaseConfig() );
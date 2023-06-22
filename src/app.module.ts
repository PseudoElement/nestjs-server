import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from '@entities/user/users.module';
import { ConfigModule } from './config.module';
import { Users } from '@entities/user/users.model';

@Module({
    imports: [
        UsersModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'nest_test',
            password: 'nest_test',
            database: 'nest_test',
            models: [Users],
        }),
        ConfigModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

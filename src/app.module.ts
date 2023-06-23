import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from '@entities/user/users.module';
import { ConfigModule } from './config.module';
import { Users } from '@entities/user/users.model';
import { AuthModule } from './entities/auth/auth.module';
import { ChatModule } from './entities/chat/chat.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'nestjs-postgres', //name of postgres-container (without docker - localhost)
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'nestjs-db',
            models: [Users],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        ConfigModule,
        AuthModule,
        ChatModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

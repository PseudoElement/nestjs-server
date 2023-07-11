import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from '@entities/user/users.module';
import { ConfigModule } from './config.module';
import { Users } from '@entities/user/users.model';
import { AuthModule } from './entities/auth/auth.module';
import { ChatModule } from './entities/chat/chat.module';
import { AboutPageModule } from './entities/about-page/about-page.module';
import { Messages } from '@entities/chat/chat.model';
import { DeveloperCards } from '@entities/about-page/about-page.model';
import { ProductsPageModule } from './entities/products-page/products-page.module';
import { Applications } from '@entities/products-page/apps.model';
import { Games } from '@entities/products-page/games.model';
import { TokenService } from './services/token.service';
import { DeveloperPageModule } from './entities/developer-page/developer-page.module';
import { Developers } from '@entities/developer-page/developer-page.model';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'nestjs-postgres', //name of postgres-container (without docker - localhost)
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'nestjs-db',
            models: [Users, Messages, DeveloperCards, Applications, Games, Developers],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        ConfigModule,
        AuthModule,
        ChatModule,
        AboutPageModule,
        ProductsPageModule,
        DeveloperPageModule,
    ],
    providers: [TokenService],
})
export class AppModule {}

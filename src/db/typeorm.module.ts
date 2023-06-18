import { User } from '@entities/user/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        NestTypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                entities: [User],
                synchronize: true,
                migrations: ['dist/db/migrations/**/*.js'],
            }),
            inject: [ConfigService],
            // cli: { migrationsDir: 'src/db/migrations' },
        }),
    ],
})
export class TypeormModule {}

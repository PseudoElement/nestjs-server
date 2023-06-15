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
                host: '127.0.0.1',
                port: 5432,
                username: 'nest_test',
                password: 'nest_test',
                database: 'nest_test',
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

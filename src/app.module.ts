import { Module } from '@nestjs/common';
import { UserModule } from '@entities/user/user.module';
import { TypeormModule } from './db/typeorm.module';
import { ConfigModule } from './config.module';

@Module({
    imports: [UserModule, TypeormModule, ConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

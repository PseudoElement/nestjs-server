import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [NestConfigModule.forRoot({ isGlobal: true, envFilePath: '.development.env' })],
})
export class ConfigModule {}

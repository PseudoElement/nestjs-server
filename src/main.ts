import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app
        .listen(3000)
        .then(() => console.log('Server running'))
        .catch((err) => console.log('Catch error is', err));
}
bootstrap();

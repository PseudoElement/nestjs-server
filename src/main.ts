import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], origin: '*' });
    await app
        .listen(3000)
        .then(() => console.log('Server running'))
        .catch((err) => console.log('Catch error is', err));
}
bootstrap();

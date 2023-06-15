import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app
        .listen(3000)
        .then(() => console.log('Server running'))
        .catch((err) => console.log('Catch error is', err));
}
bootstrap();

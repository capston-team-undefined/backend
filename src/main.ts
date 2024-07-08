import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // DTO 변환을 위해 필요합니다.
    whitelist: true, // DTO에 없는 속성은 자동으로 제거됩니다.
  }));
  await app.listen(3000);
}
bootstrap();

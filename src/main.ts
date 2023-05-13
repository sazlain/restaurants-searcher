import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('Find Food REST API')
    .setDescription('API REST encontrar comida')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document);

  const usersService = app.get(SeedService);
  await usersService.runSeeds();

  await app.listen(3000);
}
bootstrap();
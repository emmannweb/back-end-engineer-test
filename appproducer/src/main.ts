import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Csv File Upload, validation, transformation and transfert')
    .setDescription(
      'Use upload file endpoint to validate, transform csv file, convert it to fit our need and send batches of 1.000 rows per second from a file of 10.000 rows to another microservice event based  to save it in a mongo DB database. ',
    )
    .setVersion('1.0')
    .addGlobalParameters()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api', app, document);

  app.enableCors();
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        'img-src': ["'self'", 'https: data:'],
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

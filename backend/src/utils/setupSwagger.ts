import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('E-Pharmacy-Franchise')
    .setDescription('The E-Pharmacy-Franchise API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'Please enter your Bearer token',
    })
    .addCookieAuth('sessionId', {
      type: 'apiKey',
      in: 'cookie',
      description: 'Session cookie used for user authentication',
    })
    .addServer('http://localhost:3388/', 'Swagger UI URL')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
};

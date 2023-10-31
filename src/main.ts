import helmet from "@fastify/helmet";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaExceptionFilter } from "./common/exceptionFilter/prismaExceptionFilter";

async function bootstrap() {
  // CORS is enabled
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true }
  );

  // Request Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Global Exception Filter
  app.useGlobalFilters(new PrismaExceptionFilter());

  // Helmet Middleware against known security vulnerabilities
  await app.register(helmet);

  // Swagger API Documentation
  if (process.env.NODE_ENV === "development") {
    const options = new DocumentBuilder()
      .setTitle("NestJS Starter API")
      .setVersion("0.1.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, document);
  }

  await app.listen(process.env.PORT || 8080, process.env.HOST);
}

bootstrap();

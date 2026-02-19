// Vercel serverless function entry point
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const application = await bootstrap();
  const server = application.getHttpAdapter().getInstance();
  return server(req, res);
};

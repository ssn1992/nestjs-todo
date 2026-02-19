import {INestApplication, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Todo API')
    .setDescription('A simple Todo API built with NestJS, MySQL, and TypeORM')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // JavaScript for export buttons
  const customJs = Buffer.from(`
    window.onload = function() {
      setTimeout(function() {
        const topbar = document.querySelector('.topbar-wrapper .topbar');
        if (topbar && !document.getElementById('export-buttons-container')) {
          const exportBtn = document.createElement('button');
          exportBtn.className = 'export-btn export-btn-blue';
          exportBtn.innerHTML = '📥 Export OpenAPI JSON';
          exportBtn.onclick = function() {
            window.open('/api-json', '_blank');
          };
          
          const downloadBtn = document.createElement('button');
          downloadBtn.className = 'export-btn export-btn-green';
          downloadBtn.innerHTML = '📤 Download Collection';
          downloadBtn.onclick = function() {
            fetch('/api-json')
              .then(function(res) { return res.json(); })
              .then(function(data) {
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'nestjs-todo-api-collection.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              })
              .catch(function(error) {
                console.error('Error downloading collection:', error);
                alert('Failed to download collection. Please try again.');
              });
          };
          
          const btnContainer = document.createElement('div');
          btnContainer.id = 'export-buttons-container';
          btnContainer.style.cssText = 'display: flex; margin-right: 20px;';
          btnContainer.appendChild(exportBtn);
          btnContainer.appendChild(downloadBtn);
          
          topbar.appendChild(btnContainer);
        }
      }, 500);
    };
  `).toString('base64');

  // Swagger UI options with export functionality
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      displayRequestDuration: true,
      persistAuthorization: true,
    },
    customSiteTitle: 'NestJS Todo API Documentation',
    customCss: `
      .swagger-ui .topbar { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
      }
      .export-btn {
        padding: 8px 16px;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        margin-left: 10px;
      }
      .export-btn-blue { background-color: #4990e2; }
      .export-btn-blue:hover { background-color: #357abd; }
      .export-btn-green { background-color: #49a84e; }
      .export-btn-green:hover { background-color: #3a8640; }
    `,
    customJs: 'data:text/javascript;base64,' + customJs,
  });

  await app.listen(process.env.PORT || 3000);
}

// Check if running on Vercel (serverless)
if (!process.env.VERCEL) {
  bootstrap();
}

// Export for Vercel serverless
export default async (req, res) => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.init();

  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
};

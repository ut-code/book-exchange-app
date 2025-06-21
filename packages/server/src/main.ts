import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 4002;
  
  // グレースフルシャットダウンの設定
  app.enableShutdownHooks();
  
  await app.listen(port, () => {
    console.log(`
🚀 Server ready at: http://localhost:${port}/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-nestjs#using-the-graphql-api
`);
  });
  
  // プロセスシグナルのハンドリング
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
  
  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
}
bootstrap();

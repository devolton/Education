import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser'
import * as process from "process";
import {Config} from "./Config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const HOST  = process.env.HOST;
   const PORT= parseInt(process.env.PORT);

    app.setGlobalPrefix('/api');
    app.use(cookieParser());
    app.enableCors({
        origin:[Config.URL.ADMIN_URL,Config.URL.CLIENT_URL,Config.URL.REMOTE_ADMIN_URL],
        credentials:true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })

    const config = new DocumentBuilder()
        .setTitle('Education BACKEND')
        .setDescription('REST API documentation for Education course project!')
        .setVersion('1.0.0')
        .addTag('DEVOLTON, NEST JS')
        .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs', app,document);


    await app.listen(PORT,HOST, () => {
        console.log(`========SERVER STARTED IN ${HOST} HOST AND ${PORT} PORT======`);
    });
}

bootstrap();

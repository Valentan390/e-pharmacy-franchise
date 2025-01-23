import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { Connection } from 'mongoose';
import { ShopModule } from './shop/shop.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('MONGODB_USER')}:${configService.get<string>('MONGODB_PASSWORD')}@${configService.get<string>('MONGODB_URL')}/${configService.get<string>('MONGODB_DB')}?retryWrites=true&w=majority&appName=Cluster0`,
        // onConnectionCreate: (connection: Connection) => {
        //   connection.on('connected', () =>
        //     console.log('Mongodb connection successfully'),
        //   );
        // },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ShopModule,
    CloudinaryModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

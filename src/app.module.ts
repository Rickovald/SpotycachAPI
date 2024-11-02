import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointsModule } from './appoints/appoints.module';
import { StuffModule } from './stuff/stuff.module';
import { ComplectModule } from './complect/complects.module';
import { UserModule } from './users/user.module';
import { SessionCleanerService } from './auth/session-clean.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Session } from './common/entities/session.entity';
import { StuffTypesModule } from './stuffTypes/stuffTypes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: Number(configService.get('POSTGRES_PORT')),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [__dirname + '/../**/*.entity.js'],
          synchronize: true
        };
      }
    }),
    AuthModule,
    AppointsModule,
    StuffModule,
    StuffTypesModule,
    ComplectModule,
    UserModule,
    TypeOrmModule.forFeature([Session]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, SessionCleanerService],
})
export class AppModule { }

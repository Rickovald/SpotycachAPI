import { Module } from '@nestjs/common';
import { AppointsService } from './appoints.service';
import { AppointsController } from './appoints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appoints } from '../common/entities/appoint.entity';
import { User } from 'src/common/entities/user.entity';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appoints, User]), UserModule],
  controllers: [AppointsController],
  providers: [AppointsService],
  exports: [AppointsService, TypeOrmModule],
})
export class AppointsModule { }

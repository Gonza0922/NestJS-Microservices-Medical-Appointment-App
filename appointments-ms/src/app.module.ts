import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { envs } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(envs.mongoUri, {
      dbName: 'appointments',
    }),
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

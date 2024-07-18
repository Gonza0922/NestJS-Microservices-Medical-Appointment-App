import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: 'appointments',
    }),
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

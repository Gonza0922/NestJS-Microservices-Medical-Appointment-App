import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {
  Appointment,
  AppointmentSchema,
} from './appointments/schemas/appointment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.URL_DB, {
      dbName: 'appointments',
    }),
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [AppointmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AppointmentsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

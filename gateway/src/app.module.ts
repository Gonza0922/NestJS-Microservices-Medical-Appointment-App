import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppointmentsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

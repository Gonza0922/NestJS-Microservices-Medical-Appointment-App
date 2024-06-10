import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AppointmentsModule,
    UsersModule,
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'APPOINTMENTS',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

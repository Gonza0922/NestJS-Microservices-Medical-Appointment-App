import { Module } from '@nestjs/common';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECURE,
      signOptions: { expiresIn: '1d' },
    }),
    AppointmentsModule,
    UsersModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

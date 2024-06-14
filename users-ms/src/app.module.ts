import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.URL_DB, {
      dbName: 'users',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TrainersModule } from './trainers/trainers.module';
import { MembershipTypesModule } from './membership-types/membership-types.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    TrainersModule,
    MembershipTypesModule,
  ],
})
export class AppModule {}
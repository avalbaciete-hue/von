import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FitnessClassesService } from './fitness-classes.service';
import { FitnessClassesController } from './fitness-classes.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [FitnessClassesController],
  providers: [FitnessClassesService],
  exports: [FitnessClassesService],
})
export class FitnessClassesModule {}
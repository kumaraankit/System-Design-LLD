import { Module } from '@nestjs/common';
import { LoggerController } from './controllers/logger/logger.controller';
import { LoggerService } from './services/logger/logger.service';


@Module({
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { LogLevels } from 'src/logger/enums/logger-enums';
import { LoggerService } from 'src/logger/services/logger/logger.service';

@Controller('logger')
export class LoggerController {

    constructor(private readonly loggerService:LoggerService){

    }
    
    @Post()
    logMessage(@Body() body:{level:LogLevels;message:string}){
     this.loggerService.log(body.level,body.message)
     return {status:'logged ',...body}
    }
}

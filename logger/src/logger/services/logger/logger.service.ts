import { Injectable } from '@nestjs/common';
import { LogLevels } from 'src/logger/enums/logger-enums';
import { LogMessage, LogOutput } from 'src/logger/interfaces/log-output.interface';
import { ConsoleOutput } from 'src/logger/outputs/console.output';
import { FileOutput } from 'src/logger/outputs/file.output';

@Injectable()
export class LoggerService {
    private logLevel: LogLevels = LogLevels.DEBUG;
    private outputs: LogOutput[] = [new ConsoleOutput(), new FileOutput()];

    async log(level: LogLevels, message: string): Promise<void> {
        if (this.shouldLog(level)) {
            const log: LogMessage = {
                timestamp: new Date(),
                level,
                message,
            };
            await Promise.all(
                this.outputs.map(output => Promise.resolve(output.write(log)))
            );
        }
    }

    private shouldLog(level: LogLevels): boolean {
        return level >= this.logLevel;
    }

    setLogLevel(level: LogLevels) {
        this.logLevel = level;
    }

}

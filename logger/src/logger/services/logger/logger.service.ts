import { Injectable } from '@nestjs/common';
import { LogLevels } from 'src/logger/enums/logger-enums';
import { LogMessage, LogOutput } from 'src/logger/interfaces/log-output.interface';
import { ConsoleOutput } from 'src/logger/outputs/console.output';
import { FileOutput } from 'src/logger/outputs/file.output';

@Injectable()
export class LoggerService {
    private logLevel: LogLevels = LogLevels.DEBUG;
    private outputs: LogOutput[] = [new ConsoleOutput(), new FileOutput()];

    log(level: LogLevels, message: string): void {
        if (this.shouldLog(level)) {
            const log: LogMessage = {
                timestamp: new Date(),
                level,
                message,
            };
            this.outputs.forEach((output) => output.write(log));
        }
    }

    private shouldLog(level: LogLevels): boolean {
        const levels = Object.values(LogLevels);
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    setLogLevel(level: LogLevels) {
        this.logLevel = level;
    }

    addOutput(output: LogOutput) {
        this.outputs.push(output);
    }

}

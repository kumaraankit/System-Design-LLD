import { LogLevels } from "../enums/logger-enums";
import { LogMessage, LogOutput } from "../interfaces/log-output.interface";
import * as fs from 'fs';

export class FileOutput implements LogOutput {
    private logFileName = 'demo.log';
    write(log: LogMessage): void {
        const levelStr = LogLevels[log.level];
        const logforFile = `[${log.timestamp.toDateString()}] [${levelStr}] ${log.message}\n`;
        fs.appendFileSync(this.logFileName, logforFile)
    }
}
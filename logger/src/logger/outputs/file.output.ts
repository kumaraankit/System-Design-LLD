import { LogMessage, LogOutput } from "../interfaces/log-output.interface";
import * as fs from 'fs';

export class FileOutput implements LogOutput {
    private logFileName = 'demo.log';
    write(log: LogMessage): void {
        const logforFile = `[${log.timestamp.toISOString()}] [${log.level}] ${log.message}\n`;
        fs.appendFileSync(this.logFileName, logforFile)
    }
}
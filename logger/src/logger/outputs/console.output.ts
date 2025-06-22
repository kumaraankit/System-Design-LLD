import { LogLevels } from "../enums/logger-enums";
import { LogMessage, LogOutput } from "../interfaces/log-output.interface";

export class ConsoleOutput implements LogOutput {
    write(log: LogMessage): void {
        const levelStr = LogLevels[log.level];
        console.log(`[${log.timestamp.toDateString()}] [${levelStr}] [${log.message}]`)
    }
}
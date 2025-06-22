import { LogMessage, LogOutput } from "../interfaces/log-output.interface";

export class ConsoleOutput implements LogOutput {
    write(log: LogMessage): void {
        console.log(`[${log.timestamp.toDateString()}] [${log.level}] [${log.message}]`)
    }
}
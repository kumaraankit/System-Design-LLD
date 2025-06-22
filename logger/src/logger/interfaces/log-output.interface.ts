import { LogLevels } from "../enums/logger-enums";

export interface LogMessage {
    timestamp: Date;
    level: LogLevels;
    message: string;
}

export interface LogOutput {
    write(log: LogMessage): void;
}
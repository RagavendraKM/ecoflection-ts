import { createLogger, format, transports, loggers } from 'winston';
import "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logFormat: any = format.combine(
    // format.colorize(),
    timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
    format.align(),
    format.json(),
    myFormat
)

const myLogger = createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new transports.DailyRotateFile({
            datePattern: "DD-MM-YYYY", filename: "logs/error.log", level: "error"
        }),
        new transports.DailyRotateFile({
            datePattern: "DD-MM-YYYY", filename: "logs/combined.log", level: "info"
        }),
        new transports.Console()
    ]
});

export class MyLogger {
    constructor() {
    }

    error(message: any, err?: any) {
        myLogger.error(message, err);
    }

    info(message: any, data?: any) {
        myLogger.info(message, data);
    }

    debug(message: any, data?: any) {
        myLogger.debug(message, data);
    }

    log(level: any, message: any, data?: any) {
        myLogger.log(level, message, data);
    }
}

export const logger = new MyLogger();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, label, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message} `;
});
const logFormat = winston_1.format.combine(
// format.colorize(),
timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.json(), myFormat);
const myLogger = winston_1.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new winston_1.transports.DailyRotateFile({
            datePattern: "DD-MM-YYYY", filename: "logs/error.log", level: "error"
        }),
        new winston_1.transports.DailyRotateFile({
            datePattern: "DD-MM-YYYY", filename: "logs/combined.log", level: "info"
        }),
        new winston_1.transports.Console()
    ]
});
class MyLogger {
    constructor() {
    }
    error(message, err) {
        myLogger.error(message, err);
    }
    info(message, data) {
        myLogger.info(message, data);
    }
    debug(message, data) {
        myLogger.debug(message, data);
    }
    log(level, message, data) {
        myLogger.log(level, message, data);
    }
}
exports.MyLogger = MyLogger;
exports.logger = new MyLogger();
//# sourceMappingURL=index.js.map
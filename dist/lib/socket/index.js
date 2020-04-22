"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const logger_1 = require("../logger");
class SocketIOClass {
    constructor() {
    }
    setupSocket(app) {
        let io = socket_io_1.default.listen(app);
        io.on("connect", socket => {
            logger_1.logger.info("Connect", socket);
        });
        io.on("connection", socket => {
            logger_1.logger.info("Connection", socket);
        });
    }
    emitEvent(event, data) {
        logger_1.logger.info("Inside emitEvent");
        this.socketObj.emit(event, data);
    }
}
exports.SocketIOClass = SocketIOClass;
exports.socketInstance = new SocketIOClass();
//# sourceMappingURL=index.js.map
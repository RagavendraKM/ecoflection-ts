import * as http from "http";
import socketIO, { Socket } from 'socket.io';
import { logger } from '../logger';

export class SocketIOClass {

    public socketObj: Socket;

    constructor() {
    }

    setupSocket(app: http.Server) {
        let io = socketIO.listen(app);

        io.on("connect", socket => {
            logger.info("Connect", socket);
        });

        io.on("connection", socket => {
            logger.info("Connection", socket);
        });
    }

    emitEvent(event: string, data: any) {
        logger.info("Inside emitEvent");
        this.socketObj.emit(event, data);
    }
}

export const socketInstance = new SocketIOClass();
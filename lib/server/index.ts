import express, { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import * as http from "http";
import compression from "compression";
import { socketInstance } from '../socket';
import { logger } from '../logger';

import { authRoute, productRoute, categoryRoute } from '../routes';
// import * as socketio from 'socket.io';

export class ExpressApp {

  public app: Express;
  private PORT: string | number = process.env.PORT || "3001";
  // public socketObj: Socket

  constructor() {
    this.setupExpress();
    this._init();
    this.setupRoutes();
    this.listenServer();
    // socketInstance.setupSocket(this.app);
  }

  setupExpress() {
    this.app = express();
  }

  private _init(): void {
    this.app.use(compression())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', "Content-Type, Content-Length");
      res.header("Access-Control-Allow-Credentials", "true");

      //intercept OPTIONS method
      if ('OPTIONS' === req.method) {
        // respond with 200
        res.sendStatus(200);
      } else {
        // move on
        next();
      }
    });
  }

  setupRoutes() {
    this.app.use('/user', authRoute.authApi());
    this.app.use('/product', productRoute.productApi());
    this.app.use('/category', categoryRoute.categoryApi());
    this.app.use('/home', (req: Request, res: Response) => {
      logger.info("Hello /");
      res.send("Hello /");
    });
  }

  listenServer() {
    const server = http.createServer(this.app).listen(this.PORT);
    logger.info(`Server running on PORT ${this.PORT}`, server);
    socketInstance.setupSocket(server);
  }

}

export const app = new ExpressApp();
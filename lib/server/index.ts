import express, { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import compression from "compression";
import * as http from 'http';

import { authRoute, productRoute, categoryRoute } from '../routes';

export class ExpressApp {

  public app: Express;
  private PORT: string | number = process.env.PORT || "3000";

  constructor() {
    this.app = express();
    this._init();
    this.setupRoutes();
    this.listenServer();
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
    this.app.use('/', (req: Request, res: Response) => {
      console.log("Hello /");
      res.send("Hello /");
    });
  }

  listenServer() {
    this.app.listen(process.env.PORT || this.PORT, () => {
      console.log(`server running on port ${this.PORT}`);
    })
  }

}

export const app = new ExpressApp();
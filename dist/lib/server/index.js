"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const http = __importStar(require("http"));
const compression_1 = __importDefault(require("compression"));
const socket_1 = require("../socket");
const logger_1 = require("../logger");
const routes_1 = require("../routes");
// import * as socketio from 'socket.io';
class ExpressApp {
    // public socketObj: Socket
    constructor() {
        this.PORT = process.env.PORT || "3001";
        this.setupExpress();
        this._init();
        this.setupRoutes();
        this.listenServer();
        // socketInstance.setupSocket(this.app);
    }
    setupExpress() {
        this.app = express_1.default();
    }
    _init() {
        this.app.use(compression_1.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', "Content-Type, Content-Length");
            res.header("Access-Control-Allow-Credentials", "true");
            //intercept OPTIONS method
            if ('OPTIONS' === req.method) {
                // respond with 200
                res.sendStatus(200);
            }
            else {
                // move on
                next();
            }
        });
    }
    setupRoutes() {
        this.app.use('/user', routes_1.authRoute.authApi());
        this.app.use('/product', routes_1.productRoute.productApi());
        this.app.use('/category', routes_1.categoryRoute.categoryApi());
        this.app.use('/', (req, res) => {
            logger_1.logger.info("Hello /");
            res.send("Hello /");
        });
    }
    listenServer() {
        const server = http.createServer(this.app).listen(this.PORT);
        logger_1.logger.info(`Server running on PORT ${this.PORT}`, server);
        socket_1.socketInstance.setupSocket(server);
    }
}
exports.ExpressApp = ExpressApp;
exports.app = new ExpressApp();
//# sourceMappingURL=index.js.map
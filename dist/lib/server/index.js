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
const compression_1 = __importDefault(require("compression"));
const routes_1 = require("../routes");
class ExpressApp {
    constructor() {
        this.PORT = process.env.PORT || "3000";
        this.app = express_1.default();
        this._init();
        this.setupRoutes();
        this.listenServer();
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
            console.log("Hello /");
            res.send("Hello /");
        });
    }
    listenServer() {
        this.app.listen(process.env.PORT || this.PORT, () => {
            console.log(`server running on port ${this.PORT}`);
        });
    }
}
exports.ExpressApp = ExpressApp;
exports.app = new ExpressApp();
//# sourceMappingURL=index.js.map
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
const controller = __importStar(require("../controllers"));
class AuthRoute {
    constructor() {
        this.router = express_1.default.Router();
    }
    authApi() {
        this.router.post('/register', controller.register);
        this.router.post('/login', controller.login);
        return this.router;
    }
}
exports.AuthRoute = AuthRoute;
exports.authRoute = new AuthRoute();
//# sourceMappingURL=authRoute.js.map
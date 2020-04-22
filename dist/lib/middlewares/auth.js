"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const auth = __importStar(require("../config/auth"));
const responseController_1 = require("../controllers/responseController");
class AuthMiddleware {
    constructor() {
    }
    createAuthToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                let payload = { subject: _id };
                let token = jwt.sign(payload, auth.jwt_secret, {
                    expiresIn: auth.jwt_expiration
                });
                req.body.token = token;
                next();
            }
            catch (err) {
                responseController_1.errorFunction(res, err, "Error while creating auth token");
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
exports.jwtMiddleware = new AuthMiddleware();
//# sourceMappingURL=auth.js.map
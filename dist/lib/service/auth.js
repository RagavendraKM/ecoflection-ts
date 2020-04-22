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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("../logger");
class AuthService {
    constructor() {
    }
    encryptPassword(pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let salt = yield bcrypt_1.default.genSalt(10);
                let hashedPwd = yield bcrypt_1.default.hash(pwd, salt);
                return hashedPwd;
            }
            catch (err) {
                logger_1.logger.info("Error while generating salt ", err);
                throw err;
            }
        });
    }
    comparePassword(pwd, hashedPwd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield bcrypt_1.default.compare(pwd, hashedPwd);
                return result;
            }
            catch (err) {
                logger_1.logger.info("Error while comparing salt ", err);
                throw err;
            }
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.js.map
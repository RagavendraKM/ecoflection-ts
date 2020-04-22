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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const responseController_1 = require("./responseController");
const service_1 = require("../service");
const database_1 = require("../utils/database");
const logger_1 = require("../logger");
const UserModel = new database_1.Functions(models_1.User);
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userBody = req.body;
            let existsUser = yield UserModel.find({ email: userBody.email });
            logger_1.logger.info("checkExistUser", existsUser);
            if (existsUser.length) {
                responseController_1.errorFunction(res, "User already Exists", "User Exists");
            }
            else {
                let hashedPwd = yield service_1.authService.encryptPassword(userBody.password);
                userBody.password = hashedPwd;
                let newUser = yield UserModel.insert(userBody);
                logger_1.logger.info("In controller ", newUser);
                let token = req.body.token;
                responseController_1.successFunction(res, { newUser, token }, "New User is ");
            }
        }
        catch (err) {
            responseController_1.errorFunction(res, err, "Error while registring user");
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userBody = req.body;
            let existsUser = yield UserModel.find({ email: userBody.email });
            if (existsUser.length) {
                let pwd = existsUser.map(user => user.password).toString();
                let isMatch = yield service_1.authService.comparePassword(userBody.password, pwd);
                if (isMatch) {
                    let { token, email } = req.body;
                    responseController_1.successFunction(res, { email, token }, "logged in user is ");
                }
                else {
                    responseController_1.errorFunction(res, "Password incorrect", "Please re-type password");
                }
            }
            else {
                responseController_1.errorFunction(res, "User not registered ", "Please Register");
            }
        }
        catch (err) {
            responseController_1.errorFunction(res, err, "Error while logging in");
        }
    });
}
exports.login = login;
//# sourceMappingURL=authController.js.map
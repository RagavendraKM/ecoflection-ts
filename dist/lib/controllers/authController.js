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
const customers_1 = require("../payments/customers");
const database_1 = require("../utils/database");
const logger_1 = require("../logger");
const UserModel = new database_1.Functions(models_1.User);
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, phone, email, type, password } = req.body;
            let existsUser = yield UserModel.find({ email: email });
            logger_1.logger.info("checkExistUser", existsUser);
            if (existsUser.length) {
                responseController_1.errorFunction(res, "User already Exists", "User Exists");
            }
            else {
                let hashedPwd = yield service_1.authService.encryptPassword(password);
                password = hashedPwd;
                let newUser = yield UserModel.insert(req.body);
                logger_1.logger.info("In controller ", newUser);
                let token = req.body.token;
                let payUser = yield customers_1.create(name, email, phone);
                console.log("payUser", payUser);
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
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logger.info("In Reset Password", req.body);
        try {
            let { currentPwd, newPwd, confirmPwd, userId } = req.body;
            let existsUser = yield UserModel.find({ email: userId });
            if (existsUser.length) {
                let pwd = existsUser.map(user => user.password).toString();
                let isMatch = yield service_1.authService.comparePassword(currentPwd, pwd);
                if (isMatch) {
                    let password = yield service_1.authService.encryptPassword(newPwd);
                    if (confirmPwd !== newPwd) {
                        responseController_1.errorFunction(res, "Password doesn't match", "Please check again");
                    }
                    let changedUser = yield UserModel.update({ email: userId }, {
                        $set: {
                            password: password
                        }
                    }, true);
                    console.log("changedUser", changedUser);
                    responseController_1.successFunction(res, changedUser, "Password Reset Done");
                }
            }
        }
        catch (err) {
            responseController_1.errorFunction(res, err, "Some DB error while resetting password");
        }
    });
}
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map
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
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userBody = req.body;
        let user = new models_1.User({ userBody });
        try {
            let userSaved = yield user.save();
            console.log(userSaved);
            responseController_1.sendResponse(res, 200, { err_code: 0, err_desc: "User Registered Succesfully", data: userSaved });
        }
        catch (err) {
            responseController_1.errorFunction(res, err, "Error while registring user");
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userBody = req.body;
        const user = new models_1.User({ userBody });
        try {
            let userSaved = yield user.save();
            console.log(userSaved);
            responseController_1.sendResponse(res, 200, { err_code: 0, err_desc: "User Registered Succesfully", data: userSaved });
        }
        catch (err) {
            responseController_1.errorFunction(res, err, "Error while logging in");
        }
    });
}
exports.login = login;
//# sourceMappingURL=authController.js.map
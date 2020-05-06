import { Request, Response } from 'express';
import { User } from '../models';
import { errorFunction, successFunction } from './responseController';
import { authService } from '../service';

import { create } from '../payments/customers';

import { Functions } from "../utils/database";
import { logger } from '../logger';
import { jwtMiddleware } from '../middlewares';
const UserModel = new Functions(User);

export async function register(req: Request, res: Response) {
    try {
        let { name, phone, email, type, password } = req.body;
        let existsUser: Array<any> = await UserModel.find({ email: email });
        logger.info("checkExistUser", existsUser);
        if (existsUser.length) {
            errorFunction(res, "User already Exists", "User Exists");
        } else {
            let hashedPwd = await authService.encryptPassword(password);
            password = hashedPwd;
            let newUser: any = await UserModel.insert(req.body);
            logger.info("In controller ", newUser);
            let token: any = req.body.token;
            let payUser: any = await create(name, email, phone);
            console.log("payUser", payUser);
            successFunction(res, { newUser, token }, "New User is ");
        }
    } catch (err) {
        errorFunction(res, err, "Error while registring user");
    }
}

export async function login(req: Request, res: Response) {
    try {
        let userBody = req.body;
        let existsUser: Array<any> = await UserModel.find({ email: userBody.email });
        if (existsUser.length) {
            let pwd: string = existsUser.map(user => user.password).toString();
            let isMatch = await authService.comparePassword(userBody.password, pwd);
            if (isMatch) {
                let { token, email } = req.body;
                successFunction(res, { email, token }, "logged in user is ");
            } else {
                errorFunction(res, "Password incorrect", "Please re-type password");
            }
        } else {
            errorFunction(res, "User not registered ", "Please Register");
        }
    } catch (err) {
        errorFunction(res, err, "Error while logging in");
    }
}

export async function resetPassword(req: Request, res: Response) {
    logger.info("In Reset Password", req.body);
    try {
        let { currentPwd, newPwd, confirmPwd, userId } = req.body;
        let existsUser = await UserModel.find({ email: userId });
        if (existsUser.length) {
            let pwd: string = existsUser.map(user => user.password).toString();
            let isMatch = await authService.comparePassword(currentPwd, pwd);
            if (isMatch) {
                let password = await authService.encryptPassword(newPwd);
                if (confirmPwd !== newPwd) {
                    errorFunction(res, "Password doesn't match", "Please check again");
                }
                let changedUser = await UserModel.update({ email: userId }, {
                    $set: {
                        password: password
                    }
                }, true);
                console.log("changedUser", changedUser);
                successFunction(res, changedUser, "Password Reset Done");
            }
        }
    } catch (err) {
        errorFunction(res, err, "Some DB error while resetting password");
    }
}
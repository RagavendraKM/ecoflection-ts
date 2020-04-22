import { Request, Response } from 'express';
import { User } from '../models';
import { errorFunction, successFunction } from './responseController';
import { authService } from '../service';

import { Functions } from "../utils/database";
import { logger } from '../logger';
const UserModel = new Functions(User);

export async function register(req: Request, res: Response) {
    try {
        const userBody = req.body;
        let existsUser: Array<any> = await UserModel.find({ email: userBody.email });
        logger.info("checkExistUser", existsUser);
        if (existsUser.length) {
            errorFunction(res, "User already Exists", "User Exists");
        } else {
            let hashedPwd = await authService.encryptPassword(userBody.password);
            userBody.password = hashedPwd;
            let newUser: any = await UserModel.insert(userBody);
            logger.info("In controller ", newUser);
            let token: any = req.body.token;
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
                let {token, email} = req.body;
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
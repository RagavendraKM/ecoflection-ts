import { Request, Response } from 'express';
import { User } from '../models';
import { sendResponse, errorFunction } from './responseController';

export async function register(req: Request, res: Response) {
    const userBody = req.body;
    let user = new User({ userBody });
    try {
        let userSaved = await user.save();
        console.log(userSaved);
        sendResponse(res, 200, { err_code: 0, err_desc: "User Registered Succesfully", data: userSaved })
    } catch (err) {
        errorFunction(res, err, "Error while registring user");
    }
}

export async function login(req: Request, res: Response) {
    const userBody = req.body;
    const user = new User({ userBody });
    try {
        let userSaved = await user.save();
        console.log(userSaved);
        sendResponse(res, 200, { err_code: 0, err_desc: "User Registered Succesfully", data: userSaved })
    } catch (err) {
        errorFunction(res, err, "Error while logging in");
    }
}
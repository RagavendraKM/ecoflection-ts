import * as jwt from 'jsonwebtoken';
import * as auth from '../config/auth';
import { Request, Response, NextFunction } from 'express';
import { errorFunction } from '../controllers/responseController';
import { logger } from '../logger';

export class AuthMiddleware {
    constructor() {
    }

    async createAuthToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            let payload = { subject: email }
            let token = jwt.sign(payload, auth.jwt_secret, {
                expiresIn: auth.jwt_expiration
            });
            req.body.token = token;
            next();
        } catch (err) {
            errorFunction(res, err, "Error while creating auth token");
        }
    }

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Req.headers", req.header);
            if (!req.headers.authorization) {
                errorFunction(res, "ERR 401", "Unauthorized Request");
            }
            let token: any = req.headers.authorization?.split(' ')[1];
            // const header = req.headers['authorization']?.split(' ')[1]
            console.log(token);
            if (token === null) {
                errorFunction(res, "ERR 401", "Unauthorized Request");
            }
            // var secret = new Buffer(auth.jwt_secret, 'base64').toString();
            // console.log("secret", secret);
            let payload: any = jwt.verify(token, auth.jwt_secret);
            console.log("Payload", payload);
            if (payload === null) {
                errorFunction(res, "ERR 401", "Unauthorized Request");
            }
            req.body.userId = payload.subject;
            logger.info(req.body.userId);
            next();
        } catch(err) {
            errorFunction(res, err, "Some error in middleware");
        }
    }

}

export const jwtMiddleware = new AuthMiddleware()
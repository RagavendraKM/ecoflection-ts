import * as jwt from 'jsonwebtoken';
import * as auth from '../config/auth';
import { Request, Response, NextFunction } from 'express';
import { errorFunction } from '../controllers/responseController';

export class AuthMiddleware {
    constructor() {
    }

    async createAuthToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = req.body;
            let payload = { subject: _id }
            let token = jwt.sign(payload, auth.jwt_secret, {
                expiresIn: auth.jwt_expiration
            });
            req.body.token = token;
            next();
        } catch (err) {
            errorFunction(res, err, "Error while creating auth token");
        }
    }
}

export const jwtMiddleware = new AuthMiddleware()
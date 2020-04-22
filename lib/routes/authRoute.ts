import express, { Router, Request, Response } from 'express';
import * as controller from '../controllers';
import { jwtMiddleware } from '../middlewares';

export class AuthRoute {

    private router: Router = express.Router();

    constructor() {
    }

    authApi(): Router {
        this.router.post('/register', jwtMiddleware.createAuthToken ,controller.register);
        this.router.post('/login', jwtMiddleware.createAuthToken, controller.login);
        return this.router;
    }
}

export const authRoute = new AuthRoute();
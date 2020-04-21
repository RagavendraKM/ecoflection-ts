import express, { Router, Request, Response } from 'express';
import * as controller from '../controllers';

export class AuthRoute {

    private router: Router = express.Router();

    constructor() {
    }

    authApi(): Router {
        this.router.post('/register', controller.register);
        this.router.post('/login', controller.login);
        return this.router;
    }
}

export const authRoute = new AuthRoute();
import express, { Router } from 'express';
import * as controllers from '../controllers';
import { jwtMiddleware } from '../middlewares';

export class ProductRoute {
    private router: Router = express.Router();

    constructor() {
    }

    productApi(): Router {
        this.router.get('/', controllers.getProducts);
        this.router.post('/addProduct', controllers.addProduct);
        this.router.get('/id/:id', controllers.getProductById);
        this.router.get('/checkout', controllers.gotoCheckout);
        this.router.post('/checkout/callback', controllers.checkoutCallback);
        return this.router;
    }
}

export const productRoute = new ProductRoute();
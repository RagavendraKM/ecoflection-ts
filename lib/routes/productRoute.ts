import express, {Router} from 'express';
import * as controllers from '../controllers';

export class ProductRoute {
    private router: Router = express.Router();

    constructor() {
    }

    productApi(): Router {
        this.router.get('/', controllers.getProducts);
        this.router.post('/addProduct', controllers.addProduct);
        this.router.get('/id/:id', controllers.getProductById);
        return this.router;
    }
}

export const productRoute = new ProductRoute();
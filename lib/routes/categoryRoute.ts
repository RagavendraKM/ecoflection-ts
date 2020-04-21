import express, {Router} from 'express';
import * as controllers from '../controllers';

export class CategoryRoute {
    private router: Router = express.Router();

    constructor() {
    }

    categoryApi(): Router {
        this.router.get('/', controllers.getCategories);
        this.router.post('/addCategory', controllers.addCategory);
        this.router.get('/id/:id', controllers.getCategoryById);
        return this.router;
    }
}

export const categoryRoute = new CategoryRoute();
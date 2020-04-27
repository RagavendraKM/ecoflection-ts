import { Request, Response } from 'express';
import { Categories } from '../models';
import { errorFunction, successFunction } from './responseController';
import { Functions } from "../utils/database";
import { logger } from '../logger';
import { socketInstance } from '../socket';

const CategoriesModel = new Functions(Categories);

export async function getCategories(req: Request, res: Response) {
    try {
        let categories: any = await CategoriesModel.find({});
        logger.info("In controller ", categories);
        successFunction(res, categories, "Categories are ");
    } catch (err) {
        logger.error("In controller err ", err);
        errorFunction(res, err, "Error while finding Categories");
    }
}

export async function getCategoryById(req: Request, res: Response) {
    try {
        logger.info(req.params.id);
        let param: any = { _id: req.params.id }
        let category: any = await CategoriesModel.find(param);
        logger.info("In controller ", category);
        successFunction(res, category, "Category is ");
    } catch (err) {
        logger.error("In controller err ", err);
        errorFunction(res, err, "Error while finding Category");
    }
}

export async function addCategory(req: Request, res: Response) {
    try {
        let newCategory: any = await CategoriesModel.insert(req.body);
        logger.info("In controller ", newCategory);
        // socketInstance.emitEvent("addCategory", { data: newCategory });
        successFunction(res, newCategory, "New Quantity is ");
    } catch (err) {
        logger.error("In controller err ", err);
        errorFunction(res, err, "Error while adding Quantity");
    }
}
import { Request, Response } from 'express';
import { Product, Categories } from '../models';
import { errorFunction, successFunction } from './responseController';
import {Functions} from "../utils/database";


const ProductModel = new Functions(Product);
const CategoriesModel = new Functions(Categories);

export async function getCategories(req: Request, res: Response) {
    try {
        let categories: any = await CategoriesModel.find({});
        console.log("In controller ", categories);
        successFunction(res, categories, "Categories are ");
    } catch (err) {
        console.log("In controller err ", err);
        errorFunction(res, err, "Error while finding Categories");
    }
}

export async function getCategoryById(req: Request, res: Response) {
    try {
        console.log(req.params.id);
        let param: any = {_id: req.params.id}
        let category: any = await CategoriesModel.find(param);
        console.log("In controller ", category);
        successFunction(res, category, "Category is ");
    } catch (err) {
        console.log("In controller err ", err);
        errorFunction(res, err, "Error while finding Category");
    }
}

export async function addCategory(req: Request, res: Response) {
    try {
        let newCategory: any = await CategoriesModel.insert(req.body);
        console.log("In controller ", newCategory);
        successFunction(res, newCategory, "New Quantity is ");
    } catch(err) {
        console.log("In controller err ", err);
        errorFunction(res, err, "Error while adding Quantity");
    }
}
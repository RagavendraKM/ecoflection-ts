import { Request, Response } from 'express';
import { Product, Categories } from '../models';
import { Functions } from "../utils/database";
import { successFunction, errorFunction } from './responseController';

const ProductModel = new Functions(Product);
const CategoriesModel = new Functions(Categories);

export async function getProducts(req: Request, res: Response) {
    try {
        let products: any = await ProductModel.find({});
        console.log("In controller ", products);
        successFunction(res, products, "Products are ");
    } catch (err) {
        console.log("In controller err ", err);
        errorFunction(res, err, "Error while finding Product");
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        console.log(req.params.id);
        let param: any = { _id: req.params.id }
        let product: any = await ProductModel.find(param);
        console.log("In controller ", product);
        successFunction(res, product, "Product is ");
    } catch (err) {
        console.log("In controller err ", err);
        errorFunction(res, err, "Error while finding Product");
    }
}

export async function addProduct(req: Request, res: Response) {
    try {
        let newProduct: any = await ProductModel.insert(req.body);
        console.log("In controller ", newProduct);
        let updatedOne = await updateQuantity(req.body);
        console.log("updatedOne",updatedOne);
        successFunction(res, newProduct, "Product is ");
    } catch (err) {
        console.log("In controller err ", err);
        errorFunction(res, err, "Error while adding Product");
    }
}

async function updateQuantity(body: any) {
    try {
        console.log("body is ", body);
        let updatedProduct = await CategoriesModel.update({ name: body.name }, {
            $inc: {
                quantity: parseFloat(body.quantity)
            }
        }, true);
        return updatedProduct;
    } catch (err) {
        console.log("In controller err ", err);
        throw err;
    }
}
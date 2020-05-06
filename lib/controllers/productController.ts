import { Request, Response } from 'express';
import { Product, Categories } from '../models';
import { Functions } from "../utils/database";
import { successFunction, errorFunction } from './responseController';
import { logger } from '../logger';
import * as axios from 'axios';
// import { socket } from '../socket';

const ProductModel = new Functions(Product);
const CategoriesModel = new Functions(Categories);

export async function getProducts(req: Request, res: Response) {
    try {
        let products: any = await ProductModel.find({});
        logger.info("In controller ", products);
        successFunction(res, products, "Products are ");
    } catch (err) {
        logger.error("In controller err ", err);
        errorFunction(res, err, "Error while finding Product");
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        logger.info(req.params.id);
        let param: any = { _id: req.params.id }
        let product: any = await ProductModel.find(param);
        logger.info("In controller ", product);
        successFunction(res, product, "Product is ");
    } catch (err) {
        logger.error("In controller err ", err);
        errorFunction(res, err, "Error while finding Product");
    }
}

export async function addProduct(req: Request, res: Response) {
    try {
        let newProduct: any = await ProductModel.insert(req.body);
        logger.info("In controller ", newProduct);
        let updatedOne = await updateQuantity(req.body);
        logger.info("updatedOne", updatedOne);
        // socket.emitEvent("productAdded", { data: newProduct });
        successFunction(res, newProduct, "Product is ");
    } catch (err) {
        logger.error("In controller err ", err);
        errorFunction(res, err, "Error while adding Product");
    }
}

async function updateQuantity(body: any) {
    try {
        logger.info("body is ", body);
        let updatedProduct = await CategoriesModel.update({ name: body.name }, {
            $inc: {
                quantity: parseFloat(body.quantity)
            }
        }, true);
        return updatedProduct;
    } catch (err) {
        logger.info("In controller err ", err);
        throw err;
    }
}

export async function gotoCheckout(req: Request, res: Response) {
    try {
        // let product = await ProductModel.find({_id: req.params.id});
        // logger.info(product);
        let _url = "https://api.razorpay.com/v1/checkout/embedded";
        let response = await axios.default.post(_url, {
            key_id: "rzp_test_hkbB5C9e19CA7W",
            name: "Ecoflection",
            description: "Checkout the first order",
            order_id: "order_EkejyVxlf34n7M",
            amount: 5000,
            currency: "INR",
            prefill: {
                name: "Raghu",
                email: "raghurkm7@gmail.com",
                contact: 8722550718,
            },
                callback_url: "https://ecoflection-api.herokuapp.com/product/checkout/callback",
            cancel_url: "https://ecoflection-api.herokuapp.com/product"
        })
        // console.log(response.data);
        res.set("Content-Type", "text/html");
        res.send(response.data);
    } catch (err) {
        logger.error(err);
        throw err
    }
}

export async function checkoutCallback(req: Request, res: Response) {
    try {
        logger.info(req.body);
        console.log(req.body);
        res.send(req.body);
    } catch (err) {
        logger.error(err);
        throw err
    }
}
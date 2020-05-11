import { Request, Response } from 'express';
import { Product, Categories } from '../models';
import { Functions } from "../utils/database";
import { successFunction, errorFunction } from './responseController';
import { logger } from '../logger';
import * as axios from 'axios';
import { keys } from '../config/razorpay';
import { createOrder } from '../payments/orders';
import { instance, razorpay } from '../payments';
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
    let body = {
        amount: "100000",
        currency: "INR",
        receipt: "Receipt 7",
        payment_capture: '1',
        notes: ''
    }
    let { amount, currency, receipt, payment_capture, notes } = body;
    try {
        let order = await createOrder(amount, currency, receipt, payment_capture, notes);
        let _url = "https://api.razorpay.com/v1/checkout/embedded";
        let prefill = {
            name: 'Raghu',
            email: 'raghurkm7@gmail.com', // Mandatory
            contact: '8722550718'  // Mandatory
        }
        let response = await axios.default.post(_url, {
            key_id: keys.client_id,
            name: "Ecoflection",
            description: "Checkout the first order",
            order_id: order.id,
            amount: order.amount,
            currency: "INR",
            prefill: prefill,
            callback_url: "https://ecoflection-api.herokuapp.com/product/checkout/callback",
            cancel_url: "https://ecoflection-api.herokuapp.com/product"
        });
        res.set("Content-Type", "text/html");
        res.send(response.data);
    } catch (err) {
        logger.error(err);
        throw err;
    }
}

// export async function gotoCheckout(req: Request, res: Response) {
//     console.log("index.html");
//     res.sendFile(__dirname + '/html/index.html');
// }

export async function checkoutCallback(req: Request, res: Response) {
    try {
        // console.log("In callback ",req.body);
        logger.info(JSON.stringify(req.body));
        let signature = req.body.razorpay_signature //req.headers["x-razorpay-signature"];
        logger.info(JSON.stringify(req.headers));
        console.log("signature ", signature);
        logger.info(JSON.stringify(signature));
        let generatedSignature = await razorpay.validateWebhookSignature(req.body, signature, 'secret');
        console.log("generatedSignature",generatedSignature);
        logger.info(JSON.stringify(generatedSignature))
        res.json({data:req.body, sig:generatedSignature, sig1: signature});
    } catch (err) {
        logger.error(err);
        throw err
    }
}
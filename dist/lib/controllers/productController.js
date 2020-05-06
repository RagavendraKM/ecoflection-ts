"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const database_1 = require("../utils/database");
const responseController_1 = require("./responseController");
const logger_1 = require("../logger");
const axios = __importStar(require("axios"));
// import { socket } from '../socket';
const ProductModel = new database_1.Functions(models_1.Product);
const CategoriesModel = new database_1.Functions(models_1.Categories);
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let products = yield ProductModel.find({});
            logger_1.logger.info("In controller ", products);
            responseController_1.successFunction(res, products, "Products are ");
        }
        catch (err) {
            logger_1.logger.error("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while finding Product");
        }
    });
}
exports.getProducts = getProducts;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.info(req.params.id);
            let param = { _id: req.params.id };
            let product = yield ProductModel.find(param);
            logger_1.logger.info("In controller ", product);
            responseController_1.successFunction(res, product, "Product is ");
        }
        catch (err) {
            logger_1.logger.error("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while finding Product");
        }
    });
}
exports.getProductById = getProductById;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newProduct = yield ProductModel.insert(req.body);
            logger_1.logger.info("In controller ", newProduct);
            let updatedOne = yield updateQuantity(req.body);
            logger_1.logger.info("updatedOne", updatedOne);
            // socket.emitEvent("productAdded", { data: newProduct });
            responseController_1.successFunction(res, newProduct, "Product is ");
        }
        catch (err) {
            logger_1.logger.error("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while adding Product");
        }
    });
}
exports.addProduct = addProduct;
function updateQuantity(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.info("body is ", body);
            let updatedProduct = yield CategoriesModel.update({ name: body.name }, {
                $inc: {
                    quantity: parseFloat(body.quantity)
                }
            }, true);
            return updatedProduct;
        }
        catch (err) {
            logger_1.logger.info("In controller err ", err);
            throw err;
        }
    });
}
function gotoCheckout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let product = await ProductModel.find({_id: req.params.id});
            // logger.info(product);
            let _url = "https://api.razorpay.com/v1/checkout/embedded";
            let response = yield axios.default.post(_url, {
                key_id: "rzp_test_hkbB5C9e19CA7W",
                name: "Ecoflection",
                description: "Checkout the first order",
                order_id: "order_EkejyVxlf34n7M",
                amount: 5000,
                currency: "INR",
                callback_url: "https://ecoflection.herokuapp.com/getProducts",
                cancel_url: "https://ecoflection.herokuapp.com/"
            });
            // console.log(response.data);
            res.set("Content-Type", "text/html");
            res.send(response.data);
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
exports.gotoCheckout = gotoCheckout;
function checkoutCallback(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.info(req.body);
            console.log(req.body);
            res.send(req.body);
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
exports.checkoutCallback = checkoutCallback;
//# sourceMappingURL=productController.js.map
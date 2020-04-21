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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const database_1 = require("../utils/database");
const responseController_1 = require("./responseController");
const ProductModel = new database_1.Functions(models_1.Product);
const CategoriesModel = new database_1.Functions(models_1.Categories);
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let products = yield ProductModel.find({});
            console.log("In controller ", products);
            responseController_1.successFunction(res, products, "Products are ");
        }
        catch (err) {
            console.log("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while finding Product");
        }
    });
}
exports.getProducts = getProducts;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            let param = { _id: req.params.id };
            let product = yield ProductModel.find(param);
            console.log("In controller ", product);
            responseController_1.successFunction(res, product, "Product is ");
        }
        catch (err) {
            console.log("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while finding Product");
        }
    });
}
exports.getProductById = getProductById;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newProduct = yield ProductModel.insert(req.body);
            console.log("In controller ", newProduct);
            let updatedOne = yield updateQuantity(req.body);
            console.log("updatedOne", updatedOne);
            responseController_1.successFunction(res, newProduct, "Product is ");
        }
        catch (err) {
            console.log("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while adding Product");
        }
    });
}
exports.addProduct = addProduct;
function updateQuantity(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("body is ", body);
            let updatedProduct = yield CategoriesModel.update({ name: body.name }, {
                $inc: {
                    quantity: parseFloat(body.quantity)
                }
            }, true);
            return updatedProduct;
        }
        catch (err) {
            console.log("In controller err ", err);
            throw err;
        }
    });
}
//# sourceMappingURL=productController.js.map
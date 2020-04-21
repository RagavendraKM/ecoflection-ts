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
const responseController_1 = require("./responseController");
const database_1 = require("../utils/database");
const ProductModel = new database_1.Functions(models_1.Product);
const CategoriesModel = new database_1.Functions(models_1.Categories);
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let categories = yield CategoriesModel.find({});
            console.log("In controller ", categories);
            responseController_1.successFunction(res, categories, "Categories are ");
        }
        catch (err) {
            console.log("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while finding Categories");
        }
    });
}
exports.getCategories = getCategories;
function getCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            let param = { _id: req.params.id };
            let category = yield CategoriesModel.find(param);
            console.log("In controller ", category);
            responseController_1.successFunction(res, category, "Category is ");
        }
        catch (err) {
            console.log("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while finding Category");
        }
    });
}
exports.getCategoryById = getCategoryById;
function addCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newCategory = yield CategoriesModel.insert(req.body);
            console.log("In controller ", newCategory);
            responseController_1.successFunction(res, newCategory, "New Quantity is ");
        }
        catch (err) {
            console.log("In controller err ", err);
            responseController_1.errorFunction(res, err, "Error while adding Quantity");
        }
    });
}
exports.addCategory = addCategory;
//# sourceMappingURL=categoriesController.js.map
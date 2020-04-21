"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers = __importStar(require("../controllers"));
class CategoryRoute {
    constructor() {
        this.router = express_1.default.Router();
    }
    categoryApi() {
        this.router.get('/', controllers.getCategories);
        this.router.post('/addCategory', controllers.addCategory);
        this.router.get('/id/:id', controllers.getCategoryById);
        return this.router;
    }
}
exports.CategoryRoute = CategoryRoute;
exports.categoryRoute = new CategoryRoute();
//# sourceMappingURL=categoryRoute.js.map
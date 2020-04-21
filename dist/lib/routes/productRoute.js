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
class ProductRoute {
    constructor() {
        this.router = express_1.default.Router();
    }
    productApi() {
        this.router.get('/', controllers.getProducts);
        this.router.post('/addProduct', controllers.addProduct);
        this.router.get('/id/:id', controllers.getProductById);
        return this.router;
    }
}
exports.ProductRoute = ProductRoute;
exports.productRoute = new ProductRoute();
//# sourceMappingURL=productRoute.js.map
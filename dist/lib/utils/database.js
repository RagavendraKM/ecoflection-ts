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
class Functions {
    constructor(modelName) {
        this.model = modelName;
    }
    find(cond) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("cond is ", cond);
            try {
                let response = yield this.model.find(cond);
                console.log("response ", response);
                return response;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    insert(values) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("req.body is ", values);
            let data = yield new this.model(values);
            console.log("data ", data);
            try {
                let dataSaved = yield data.save();
                console.log(dataSaved);
                return dataSaved;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    update(cond, query, showNew) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("new values are ", cond, query);
            let foundProduct = yield this.model.findOneAndUpdate(cond, query, { new: showNew });
            try {
                console.log("foundProduct", foundProduct);
                return foundProduct;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Functions = Functions;
//# sourceMappingURL=database.js.map
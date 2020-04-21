"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String }
});
exports.User = mongoose.model('user', userSchema);
//# sourceMappingURL=user.js.map
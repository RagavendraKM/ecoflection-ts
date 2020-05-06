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
const userDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    acceptedTerms: {
        type: Boolean,
        required: true
    },
    loggedInType: {
        type: String
    },
    resetPasswordToken: {
        type: String,
        required: false,
        default: undefined
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
        default: undefined
    }
});
exports.UserDetails = mongoose.model('userDetails', userDetailsSchema);
//# sourceMappingURL=userDetails.js.map
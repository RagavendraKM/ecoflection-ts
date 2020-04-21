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
const mongoose_1 = __importDefault(require("mongoose"));
const config = __importStar(require("../config/keys"));
class DBOperations {
    constructor() {
        this.db = config.db.mongoURI;
        this.connectDB();
    }
    connectDB() {
        mongoose_1.default.connect(this.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
            .then(() => console.log("MongoDB connected succesfully"))
            .catch((err) => console.log(err));
    }
}
exports.DBOperations = DBOperations;
exports.dbConnect = new DBOperations();
//# sourceMappingURL=dbOperations.js.map
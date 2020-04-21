import * as mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity : {type: Number, required: true}
});

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity : {type: Number, required: true},
    price: {type: String, required: true},
    userid: {type: String, required:true}
});

export const Product = mongoose.model('product', productSchema);
export const Categories = mongoose.model('categories', categoriesSchema);
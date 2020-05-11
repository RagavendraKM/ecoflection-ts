import * as mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    userid: { type: String, required: true },
});

export const Cart = mongoose.model('cart', cartSchema);
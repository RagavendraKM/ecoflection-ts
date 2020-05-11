import * as mongoose from "mongoose";

const successPaymentSchema = new mongoose.Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    userid: { type: String, required: true }
});

export const SuccessPayment = mongoose.model('successPayment', successPaymentSchema);
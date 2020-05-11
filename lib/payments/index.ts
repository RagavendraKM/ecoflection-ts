export const razorpay = require('razorpay');
import { keys } from '../config/razorpay';

export const instance = new razorpay({
    key_id: keys.client_id,
    key_secret: keys.secret_id
});
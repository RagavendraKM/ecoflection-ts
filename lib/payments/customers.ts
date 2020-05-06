const razorpay = require('razorpay');
import { keys } from '../config/razorpay';

const instance = new razorpay({
    key_id: keys.client_id,
    key_secret: keys.secret_id
});

export async function create(name: string, email: string, contact: string) {
    try {
        var cust = await instance.customers.create({
            name: name,
            email: email,
            contact: contact
        })
        console.log("cust", cust);
        return cust
    } catch (err) {
        throw err
    }
}
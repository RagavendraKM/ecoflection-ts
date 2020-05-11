import { instance } from './index';
import { logger } from '../logger';

export async function createOrder(amount: string, currency: string, receipt: string, payment_capture: string, notes: string) {
    try {
        let order = await instance.orders.create({
            amount: amount,
            currency: currency,
            receipt: receipt,
            payment_capture: payment_capture,
            notes: notes
        });
        console.log("order ", order);
        return order;
    } catch (err) {
        logger.error(err);
        return err;
    }
}

// export async function generateSignature(signature: string) {
//     let generatedSignature = await instance.validateWebhookSignature()
// }
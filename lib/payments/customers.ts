import { instance } from './index';

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
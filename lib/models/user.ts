import * as mongoose from "mongoose";
import { UserDetails } from './userDetails';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String },
    userDetails: UserDetails
});

export const User = mongoose.model('user', userSchema);
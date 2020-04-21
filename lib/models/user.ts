import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    type : {type: String, required: true},
    password : {type: String}
});

export const User = mongoose.model('user', userSchema);
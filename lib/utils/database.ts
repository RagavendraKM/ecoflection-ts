import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { successFunction, errorFunction } from "../controllers/responseController"

export class Functions {
    model: mongoose.Model<any, {}>

    constructor(modelName?: any) {
        this.model = modelName;
    }

    async find(cond: any) {
        console.log("cond is ", cond);
        try {
            let response = await this.model.find(cond);
            console.log("response ", response);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async insert(values: any) {
        console.log("req.body is ", values);
        let data: Document = await new this.model(values);
        console.log("data ", data);
        try {
            let dataSaved = await data.save();
            console.log(dataSaved);
            return dataSaved;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async update(cond: any, query: any, showNew?: boolean) {
        console.log("new values are ", cond, query);
        let foundProduct = await this.model.findOneAndUpdate(cond, query, {new: showNew});
         try {
                console.log("foundProduct", foundProduct);
                return foundProduct;
            } catch (err) {
                console.log(err);
                throw err;
            }
    }
}
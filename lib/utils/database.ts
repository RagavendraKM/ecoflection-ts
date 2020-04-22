import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { successFunction, errorFunction } from "../controllers/responseController"
import { logger } from "../logger";

export class Functions {
    model: mongoose.Model<any, {}>

    constructor(modelName?: any) {
        this.model = modelName;
    }

    async find(cond: any) {
        logger.info("cond is ", cond);
        try {
            let response = await this.model.find(cond);
            logger.info("response ", response);
            return response;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async insert(values: any) {
        logger.info("req.body is ", values);
        let data: Document = await new this.model(values);
        logger.info("data ", data);
        try {
            let dataSaved = await data.save();
            logger.info(dataSaved);
            return dataSaved;
        } catch (err) {
            logger.error(err);
            throw err;
        }
    }

    async update(cond: any, query: any, showNew?: boolean) {
        logger.info("new values are ", cond);
        let foundProduct = await this.model.findOneAndUpdate(cond, query, {new: showNew});
         try {
                logger.info("foundProduct", foundProduct);
                return foundProduct;
            } catch (err) {
                logger.error(err);
                throw err;
            }
    }
}
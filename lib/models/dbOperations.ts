import mongoose from "mongoose";
import * as config from "../config/keys";
import { logger } from "../logger";

export class DBOperations {

    private db: string = config.db.mongoURI;

    constructor() {
        this.connectDB();
    }

    private connectDB() {
        mongoose.connect(
            this.db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(() => logger.info("MongoDB connected succesfully"))
            .catch((err) => logger.error(err));
    }

}

export const dbConnect = new DBOperations();
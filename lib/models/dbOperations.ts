import mongoose from "mongoose";
import * as config from "../config/keys";

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
            .then(() => console.log("MongoDB connected succesfully"))
            .catch((err) => console.log(err));
    }

}

export const dbConnect = new DBOperations();
import bcrypt from "bcrypt"
import { logger } from "../logger";

export class AuthService {

    constructor() {
    }

    async encryptPassword(pwd: any) {
        try {
            let salt = await bcrypt.genSalt(10);
            let hashedPwd = await bcrypt.hash(pwd, salt);
            return hashedPwd;
        } catch (err) {
            logger.info("Error while generating salt ", err);
            throw err;
        }
    }

    async comparePassword(pwd: any, hashedPwd: any) {
        try {
            let result = await bcrypt.compare(pwd, hashedPwd);
            return result;
        } catch(err) {
            logger.info("Error while comparing salt ", err);
            throw err;
        }
    }

}

export const authService = new AuthService();
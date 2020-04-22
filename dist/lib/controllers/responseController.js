"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
function sendResponse(res, code, data) {
    return res.status(code).json(data);
}
exports.sendResponse = sendResponse;
function successFunction(res, data, err_desc) {
    logger_1.logger.info("DATA", data);
    return sendResponse(res, 200, { err_code: 0, err_desc: err_desc, data: data });
}
exports.successFunction = successFunction;
function errorFunction(res, err, err_desc) {
    logger_1.logger.error("Error", err);
    return sendResponse(res, 400, { err_code: 1, err_desc: err_desc, data: err });
}
exports.errorFunction = errorFunction;
//# sourceMappingURL=responseController.js.map
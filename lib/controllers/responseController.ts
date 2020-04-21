import { Response } from 'express';

export function sendResponse(res: Response, code: number, data: object) {
    return res.status(code).json(data);
}

export function successFunction(res: Response, data: object, err_desc?: string) {
    console.log("DATA", data);
    return sendResponse(res, 200, { err_code: 0, err_desc: err_desc, data: data });
}

export function errorFunction(res: Response, err: any, err_desc?: string) {
    console.log("Error", err);
    return sendResponse(res, 400, { err_code: 1, err_desc: err_desc, data: err });
}
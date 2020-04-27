// import { Request, Response } from 'express';
// import { google } from 'googleapis';
// import axios from 'axios';
// import * as queryString from 'query-string';
// import { web } from '../../config/oauth2.keys';
// import { logger } from '../../logger';
// import { errorFunction, successFunction } from '../responseController';
// const params = queryString.stringify({
//     client_id: web.client_id,
//     redirect_uri: web.redirect_uris,
//     scope: web.scopes.join(' '),
//     response_type: web.response_type,
//     access_type: web.access_type,
//     prompt: web.prompt
// });
// const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
// // export async function googleLogin(req: Request, res: Response) {
// //     console.log("params", params);
// //     const axiosData = await axios({
// //         url: googleLoginUrl,
// //         method: 'GET'
// //     });
// //     try {
// //         console.log("req.query.code", req.query.code);
// //         const requestToken = req.query.code;
// //         const access_token = await getAccessTokenFromCode(requestToken);
// //         const data = await getUserData(access_token);
// //         successFunction(res, data, "User data");
// //     } catch (err) {
// //         errorFunction(res, err, "Error in getAccessTokenFromCode");
// //     }
// // }
// export async function getAccessTokenFromCode(code: any) {
//     try {
//         const { data } = await axios({
//             url: `https://oauth2.googleapis.com/token`,
//             method: 'post',
//             data: {
//                 client_id: web.client_id,
//                 client_secret: web.client_secret,
//                 redirect_uri: 'http://localhost:3001/user/auth/google/callback',
//                 grant_type: 'authorization_code',
//                 code,
//             }
//         });
//         logger.info(data);
//         return data.access_token;
//     } catch (err) {
//         return err;
//     }
// }
// export async function getUserData(access_token: any) {
//     try {
//         const { data } = await axios({
//             url: `https://www.googleapis.com/oauth2/v2/userinfo`,
//             method: 'get',
//             headers: {
//                 Authorization: `Bearer ${access_token}`
//             }
//         });
//         logger.info(JSON.stringify(data));
//         return data;
//     } catch (err) {
//         return err
//     }
// }
//# sourceMappingURL=googleLogin.js.map
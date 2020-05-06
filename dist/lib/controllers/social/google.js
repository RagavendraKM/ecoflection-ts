"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const oauth2_keys_1 = require("../../config/oauth2.keys");
const responseController_1 = require("../responseController");
const client_id = oauth2_keys_1.web.client_id;
const client_secret = oauth2_keys_1.web.client_secret;
const redirect_uris = oauth2_keys_1.web.redirect_uris;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris);
function getAuthUrl(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: oauth2_keys_1.web.scopes,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    return authUrl;
}
function getUserData(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const service = googleapis_1.google.people({ version: 'v1', auth });
            const result = yield service.people.get({
                resourceName: 'people/me',
                personFields: 'emailAddresses,names'
            });
            // console.log("result", result);
            const data = result.data;
            return data;
        }
        catch (err) {
            throw err;
        }
    });
}
function googleRedirect(req, res) {
    try {
        const authUrl = getAuthUrl(oAuth2Client);
        res.redirect(authUrl);
    }
    catch (err) {
        responseController_1.errorFunction(res, err, "Error in loginGoogle 1");
    }
}
exports.googleRedirect = googleRedirect;
function googleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const code = req.query.code.toString();
            console.log("code", code);
            const token = yield oAuth2Client.getToken(code);
            console.log("token", token.tokens);
            oAuth2Client.setCredentials(token.tokens);
            const data = yield getUserData(oAuth2Client);
            console.log("data", data);
            responseController_1.successFunction(res, data, "Data here");
        }
        catch (err) {
            responseController_1.errorFunction(res, err, "Error in googleLogin 2");
        }
    });
}
exports.googleLogin = googleLogin;
//# sourceMappingURL=google.js.map
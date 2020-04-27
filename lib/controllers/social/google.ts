import { Request, Response } from 'express';
import { google } from 'googleapis';
import { web } from '../../config/oauth2.keys';
import { OAuth2Client } from 'google-auth-library';
import { successFunction, errorFunction } from '../responseController';

const client_id = web.client_id;
const client_secret = web.client_secret;
const redirect_uris = web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris);

function getAuthUrl(oAuth2Client: OAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: web.scopes,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    return authUrl;
}

async function listConnectionNames(auth: OAuth2Client) {
    try {
        const service = google.people({ version: 'v1', auth });
        const result: any = await service.people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,names'
        });
        // console.log("result", result);
        const data = result.data;
        return data;
    } catch (err) {
        throw err;
    }
}

export function googleRedirect(req: Request, res: Response) {
    try {
        const authUrl = getAuthUrl(oAuth2Client);
        res.redirect(authUrl);
    } catch (err) {
        errorFunction(res, err, "Error in loginGoogle 1")
    }
}

export async function googleLogin(req: Request, res: Response) {
    try {
        const code = req.query.code.toString();
        console.log("code", code);
        const token: any = await oAuth2Client.getToken(code);
        console.log("token", token.tokens);
        oAuth2Client.setCredentials(token.tokens);
        const data = await listConnectionNames(oAuth2Client);
        console.log("data", data);
        successFunction(res, data, "Data here");
    } catch (err) {
        errorFunction(res, err, "Error in googleLogin 2");
    }
}
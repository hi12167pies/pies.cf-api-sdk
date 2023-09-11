"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intents = exports.PieSDK = void 0;
const axios_1 = __importDefault(require("axios"));
class PieSDK {
    _authToken;
    constructor(authToken) {
        this._authToken = authToken;
    }
    _url(path) {
        return `https://api.pies.cf${path}`;
    }
    _get(url, body) {
        return axios_1.default.get(this._url(url), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._authToken
            },
            data: body
        });
    }
    _post(url, body) {
        return axios_1.default.post(this._url(url), body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this._authToken
            }
        });
    }
    async ping() {
        return (await this._get("/ping")).data;
    }
    async getAppInfo() {
        return (await this._get("/app/info")).data.data;
    }
    async getAccountInfo(code) {
        return (await this._get("/account/info", { code })).data.data;
    }
    async getShortendURLS(code) {
        return (await this._get("/account/urlshort", { code })).data.data;
    }
    async createShortendURL(code, name, host, url) {
        return (await this._post("/account/urlshort", { code, name, host, url })).data.data;
    }
    async getAccountTunnels(code) {
        return (await this._get("/account/tunnels", { code })).data.data;
    }
    async getAccountLinks(code) {
        return (await this._get("/account/links", { code })).data.data;
    }
    async getAccountLicenses(code) {
        return (await this._get("/account/licenses", { code })).data.data;
    }
    async getAccountPermissions(code) {
        return (await this._get("/account/permissions", { code })).data.data;
    }
}
exports.PieSDK = PieSDK;
var Intents;
(function (Intents) {
    Intents[Intents["AccountID"] = 0] = "AccountID";
    Intents[Intents["AccountEmail"] = 1] = "AccountEmail";
    Intents[Intents["AccountUsername"] = 2] = "AccountUsername";
    Intents[Intents["AccountPermissions"] = 3] = "AccountPermissions";
    Intents[Intents["AccountCreationDate"] = 4] = "AccountCreationDate";
    Intents[Intents["AccountVerified"] = 5] = "AccountVerified";
    Intents[Intents["AccountIsAdmin"] = 6] = "AccountIsAdmin";
    Intents[Intents["Account2FAEnabled"] = 7] = "Account2FAEnabled";
    Intents[Intents["ViewLicenses"] = 8] = "ViewLicenses";
    Intents[Intents["ViewURLShort"] = 9] = "ViewURLShort";
    Intents[Intents["CreateURLShort"] = 10] = "CreateURLShort";
    Intents[Intents["ViewTunnels"] = 11] = "ViewTunnels";
    Intents[Intents["ViewLinks"] = 12] = "ViewLinks";
})(Intents || (exports.Intents = Intents = {}));

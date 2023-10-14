import axios from "axios"

export interface StringObject {
  [key: string]: string
}


export class PieSDK {
  private authToken: string
  private getAuthHeader() {
    return "Bearer " + this.authToken
  }
  constructor(authToken: string) {
    this.authToken = authToken
  }

  _createQuery(obj: StringObject) {
    let strs = []
    for (const key in obj) {
      const value = obj[key]
      strs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return `?${strs.join("&")}`
  }


  _url(path: string, body?: StringObject) {
    let str = `https://api.pies.cf${path}`
    if (body != null && Object.keys(body).length != 0) {
      str += this._createQuery(body)
    }
    return str
  }

  async _get(url: string, body?: StringObject) {
    return await axios.get(this._url(url, body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader()
      },
      data: body
    })
  }

  async _post(url: string, body?: StringObject) {
    return await axios.post(this._url(url, body), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader()
      }
    })
  }

  async ping() {
    return (await this._get("/ping")).data
  }

  async getAppInfo(): Promise<AppInfo> {
    return (await this._get("/app/info")).data.data
  }

  async getAccountInfo(code: AccountCode): Promise<AccountInfo> {
    return (await this._get("/account/info", { code })).data.data
  }

  async getShortendURLS(code: AccountCode): Promise<URLShort[]> {
    return (await this._get("/account/urlshort", { code })).data.data
  }

  async createShortendURL(code: AccountCode, name: string, host: string, url: string): Promise<void> {
    return (await this._post("/account/urlshort", { code, name, host, url })).data.data
  }
  async getAccountTunnels(code: AccountCode): Promise<Tunnel[]> {
    return (await this._get("/account/tunnels", { code })).data.data
  }

  async getAccountLinks(code: AccountCode): Promise<Link[]> {
    return (await this._get("/account/links", { code })).data.data
  }

  async getAccountLicenses(code: AccountCode): Promise<License[]> {
    return (await this._get("/account/licenses", { code })).data.data
  }

  async getAccountPermissions(code: AccountCode): Promise<Permission[]> {
    return (await this._get("/account/permissions", { code })).data.data
  }
}

export type AppInfo = {
  id: number,
  owner: number,
  name: string,
  redirect_uri_agreed: string,
  redirect_uri_denied: string,
  verified: boolean,
  intents: Intents[],
  auth_url: string
}

export type AccountInfo = {
  id?: number,
  username?: string,
  email?: string,
  created?: string,
  "2fa"?: string,
  admin?: boolean,
  verified?: boolean
}

export type URLShort = {
  id: number,
  name: string,
  host: string,
  url: string
}

export type Tunnel = {
  id: number,
  url: string
}

export type Link = {
  id: number,
  type: string,
  oneTime: boolean
}

export type License = {
  id: number,
  type: string,
  status: string,
  disabled: boolean,
  eula: boolean
}

export type Permission = string

export type AccountCode = string

export enum Intents {
  "AccountID" = 0,
  "AccountEmail" = 1,
  "AccountUsername" = 2,
  "AccountPermissions" = 3,
  "AccountCreationDate" = 4,
  "AccountVerified" = 5,
  "AccountIsAdmin" = 6,
  "Account2FAEnabled" = 7,
  "ViewLicenses" = 8,
  "ViewURLShort" = 9,
  "CreateURLShort" = 10,
  "ViewTunnels"= 11,
  "ViewLinks" = 12
}
const axios = require("axios").default

module.exports = class PiesSDK {
  #authToken
  /**
   * @param {string} authToken 
   */
  constructor(authToken) {
    this.#authToken = authToken
  }

  #url(path) {
    return `https://api.pies.cf${path}`
  }

  #get(url, body) {
    return axios.get(this.#url(url), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.#authToken
      },
      data: body
    })
  }

  #post(url, body) {
    return axios.post(this.#url(url), body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.#authToken
      }
    })
  }

  async ping() {
    return (await this.#get("/ping")).data
  }

  async getAppInfo() {
    return (await this.#get("/app/info")).data.data
  }

  /**
   * @param {string} code
   */
  async getAccountInfo(code) {
    return (await this.#get("/account/info", { code })).data.data
  }

  /**
 * @param {string} code
 */
  async getShortendURLS(code) {
    return (await this.#get("/account/urlshort", { code })).data.data
  }

  /**
 * @param {string} code
 */
  async createShortendURL(code, name, host, url) {
    return (await this.#post("/account/urlshort", { code, name, host, url })).data.data
  }

  /**
   * @param {string} code
   */
  async getAccountTunnels(code) {
    return (await this.#get("/account/tunnels", { code })).data.data
  }

  /**
   * @param {string} code
   */
  async getAccountLinks(code) {
    return (await this.#get("/account/links", { code })).data.data
  }

  /**
   * @param {string} code
   */
  async getAccountLicenses(code) {
    return (await this.#get("/account/licenses", { code })).data.data
  }

  /**
   * @param {string} code
   */
  async getAccountPermissions(code) {
    return (await this.#get("/account/permissions", { code })).data.data
  }
}
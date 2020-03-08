const fetch = require('node-fetch');

class Request {
  static formatUrl(url, params = {}) {
    const keys = Object.keys(params);
    let newUrl = url;
    for (let index = 0; index < keys.length; index++) {
      const aKey = keys[index];
      const aValue = params[aKey];
      const n = index === 0 ? '?' : '&';
      newUrl = `${newUrl}${n}${aKey}=${aValue}`;
    }
    return newUrl;
  }

  static postJson(url, params, headers = {}) {
    return fetch(url, {
        method: 'POST',
        body: params,
        headers: { ...headers },
    })
    .then(res => res.json());
  }

  static getJson(url, params) {
    const nUrl = this.formatUrl(url, params);
    return fetch(nUrl)
    .then(res => res.json());
  }
}

module.exports = Request;
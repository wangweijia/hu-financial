const fetch = require('node-fetch');
const FormData = require('form-data');

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

  static post(url, params) {
    const headers = {
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { ...headers },
    })
    .then(res => res.json());
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
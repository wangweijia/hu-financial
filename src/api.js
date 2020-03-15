const Request = require('./utils/request');

const Host = 'http://118.190.162.218:9901/data/save';

class Api {
  static updateData(table, params) {
    return Request.post(Host, {
      table,
      params
    }).then((res) => {
      // console.log(res);
    });
  }
}

module.exports = Api;
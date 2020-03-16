const Request = require('./utils/request');

const Host = 'http://118.190.162.218:9901/';
// const Host = 'http://127.0.0.1:9901/';

class Api {
  static updateData(table, params) {
    return Request.post(`${Host}data/save`, {
      table,
      params
    }).then((res) => {
      // console.log(res);
    });
  }

  // 连板保存
  static linkingBoardSave(params) {
    return Request.post(`${Host}linkingBoard/save`, {
      params
    }).then((res) => {
      // console.log(res);
    });
  }
}

module.exports = Api;
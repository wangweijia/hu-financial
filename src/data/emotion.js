// 市场情绪
const Request = require('../utils/request');
const Api = require('../api');

class Emotion extends Object {
  constructor(props) {
    super(props);

    this.getData();
  }

  getData() {
    Request.getJson('https://flash-api.xuangubao.cn/api/market_indicator/line', {
      fields: 'market_temperature'
    }).then((res) => {
      const {code, data = []} = res;
      if (code === 20000) {
        const l = data.length - 1;
        const item = data[l];
        console.log('市场情绪:', item);
        return item;
      }
      return undefined;
    }).then((item) => {
      if (item) {
        this.updateDate(item);
      }
    })
  }

  updateDate(data) {
    Api.updateDate('emotion', data);
  }
}

module.exports = Emotion;
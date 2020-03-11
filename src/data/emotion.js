// 市场情绪
const Request = require('../utils/request');

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
        this.updateDate(item);
        return item;
      }
      return undefined;
    })
  }

  // http://118.190.162.218:9901
  updateDate(data) {
    Request.post('http://118.190.162.218:9901/data/save', {
      table: 'emotion',
      params: data
    }).then((res) => {
      // console.log(res);
    });
  }
}

module.exports = Emotion;
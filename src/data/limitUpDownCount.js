// limitUpDownCount
// 涨停家数/跌停家数

const Request = require('../utils/request');

class LimitUpDownCount extends Object {
  constructor(props) {
    super(props);

    this.getData();
  }

  getData() {
    const url = 'https://flash-api.xuangubao.cn/api/market_indicator/line';
    const params = {
      fields: 'limit_up_count,limit_down_count'
    }
    Request.getJson(url, params).then((res) => {
      const {code, data = []} = res;
      if (code === 20000) {
        const l = data.length - 1;
        const item = data[l];
        console.log('涨停(limit_up_count)家数/跌停(limit_down_count)家数:', item);
        this.updateDate(item);
        return item;
      }
      return undefined;
    })
  }

  updateDate(data) {
    Request.post('http://118.190.162.218:9901/data/save', {
      table: 'limitUpDownCount',
      params: data
    }).then((res) => {
      // console.log(res);
    });
  }
}

module.exports = LimitUpDownCount;
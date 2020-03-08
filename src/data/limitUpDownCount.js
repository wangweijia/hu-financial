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
        return item;
      }
      return undefined;
    })
  }
}

module.exports = LimitUpDownCount;
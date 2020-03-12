// 北向资金
const Request = require('../utils/request');
const Api = require('../api');

class NorthwardCapital extends Object {
  constructor(props) {
    super(props);

    this.getData();
  }

  getData() {
    const url = 'http://push2.eastmoney.com/api/qt/kamt/get'
    const params = {
      fields1: 'f1,f2,f3,f4',
      fields2: 'f51,f52,f53,f54'
    }
    Request.getJson(url, params).then((res) => {
      const { data = {} } = res;
      const { hk2sh, hk2sz } = data;
      if (hk2sh && hk2sz) {
        const {dayNetAmtIn: sh} = hk2sh;
        const {dayNetAmtIn: sz} = hk2sz;
        const count = sh + sz;
        console.log('北向资金(万):', count);
        return count;
      }
      return 0;
    }).then((count) => {
      this.updateDate({count});
    })
  }

  updateDate(data) {
    Api.updateDate('northwardCapital', data);
  }
}

module.exports = NorthwardCapital;
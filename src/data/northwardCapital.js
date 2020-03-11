// 北向资金
const Request = require('../utils/request');

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
        this.updateDate({count})
        return count;
      }
      return 0;
    })
  }

  updateDate(data) {
    Request.post('http://118.190.162.218:9901/data/save', {
      table: 'northwardCapital',
      params: data
    }).then((res) => {
      // console.log(res);
    });
  }
}

module.exports = NorthwardCapital;
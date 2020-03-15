// limitUpDownCount
// 涨停家数/跌停家数

const Request = require('../utils/request');
const Api = require('../api');


const url = 'http://www.iwencai.com/unifiedwap/unified-wap/result/get-stock-pick';

const DataType = {
  Up: {
    question: '涨停 去除ST',
    key: 'limit_up_count',
  },
  Down: {
    question: '跌停 去除ST',
    key: 'limit_down_count',
  },
}

class LimitUpDownCount extends Object {
  constructor(props) {
    super(props);

    // this.getData();
    this.getAllDataNoST();
  }

  // 没有去除 st 股票
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
    }).then((item) => {
      if (item) {
        this.updateData(item);
      }
    })
  }

  getAllDataNoST() {
    const keys = [
      DataType.Up,
      DataType.Down
    ];

    const p = keys.map((item) => {
      return this.getDataNoST(item);
    });

    Promise.all(p).then((data = []) => {
      console.log(data);
      let allData = {};
      data.forEach((item) => {
        allData = {...allData, ...item};
      })
      this.updateData(allData);
    })
  }

  getDataNoST(item) {
    const {question, key} = item;
    const params = new URLSearchParams();
    params.append('question', question);
    params.append('secondary_intent', '');
    params.append('condition_id', '');
    params.append('perpage', 200);

    const headers = {
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
      Origin: 'http://www.iwencai.com',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
    return Request.postJson(url, params, headers).then((res) => {
      // console.log(res);
      const {status_code, data = {}} = res;
      if (status_code === 0) {
        const {analyze_data = {}} = data;
        const { total = 0 } = analyze_data;
        console.log(`${question} 总数:`,total);
        
        const item = {
          [key]: total
        };
        return item;
      }
      return {[key]: 0};
    });
  }

  updateData(data) {
    Api.updateData('limitUpDownCount', data);
  }
}

module.exports = LimitUpDownCount;
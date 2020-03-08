// 连板
const Request = require('../utils/request');
const { URLSearchParams } = require('url');

const url = 'http://www.iwencai.com/unifiedwap/unified-wap/result/get-stock-pick';

const DataType = {
  One: {
    question: '连续涨停天数=1',
    key: 1,
  },
  Two: {
    question: '连续涨停天数=2',
    key: 2,
  },
  Three: {
    question: '连续涨停天数=3',
    key: 3,
  },
  Four: {
    question: '连续涨停天数=4',
    key: 4,
  },
  more: {
    question: '连续涨停天数>4',
    key: 1,
  },
}

class LinkingBoard extends Object {
  constructor(props) {
    super(props);

    this.getAllData();
  }

  getAllData() {
    const allKeys = [
      DataType.One,
      DataType.Two,
      DataType.Three,
      DataType.Four
    ];
    allKeys.forEach((item) => {
      this.getData(item);
    })
  }

  getData(type) { 
    const {question} = type;
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
    Request.postJson(url, params, headers).then((res) => {
      // console.log(res);
      const {status_code, data = {}} = res;
      if (status_code === 0) {
        const {analyze_data = {}} = data;
        const { total = 0 } = analyze_data;
        console.log(`${question} 总数:`,total);
        return total;
      }
      return undefined;
    });
  }
}

module.exports = LinkingBoard;
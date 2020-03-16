// 连板
const Request = require('../utils/request');
const { URLSearchParams } = require('url');
const Api = require('../api');


const url = 'http://www.iwencai.com/unifiedwap/unified-wap/result/get-stock-pick';

const DataType = {
  One: {
    question: '连续涨停天数=1 去除ST',
    key: 1,
  },
  Two: {
    question: '连续涨停天数=2 去除ST',
    key: 2,
  },
  Three: {
    question: '连续涨停天数=3 去除ST',
    key: 3,
  },
  Four: {
    question: '连续涨停天数=4 去除ST',
    key: 4,
  },
  more: {
    question: '连续涨停天数>4 去除ST',
    key: 1,
  },
}

class LinkingBoard extends Object {
  constructor(props) {
    super(props);

    this.getAllData();
  }

  getAllData() {
    const items = []; 
    const  getNum = async (index = 1, resolve) => {
      const question = `连续涨停天数=${index} 去除ST'`;
      const item = {
        question,
        key: index
      }
      const i = await this.getData(item) || 0;
      items.push(i);
      if (i > 0) {
        getNum(index + 1, resolve);
      } else {
        if (resolve) {
          resolve();
        }
      }
    }

    const p = new Promise((resolve) => {
      getNum(1, resolve);
    })
    p.then(() => {
      this.updateData({items});
    });
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
    return Request.postJson(url, params, headers).then((res) => {
      // console.log(res);
      const {status_code, data = {}} = res;
      if (status_code === 0) {
        const {analyze_data = {}} = data;
        const { total = 0 } = analyze_data;
        console.log(`${question} 总数:`,total);
        return total;
      }
      return 0;
    });
  }

  updateData(data) {
    Api.linkingBoardSave(data);
  }

}

module.exports = LinkingBoard;
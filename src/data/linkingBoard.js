// 连板
const Request = require('../utils/request');
const { URLSearchParams } = require('url');
const Api = require('../api');


const url = 'http://www.iwencai.com/unifiedwap/unified-wap/result/get-stock-pick';

class LinkingBoard extends Object {
  constructor(props) {
    super(props);
    this.getMaxCount().then((count) => {
      // console.log(count);
      this.getAllData(count);
    });
  }

  // 获取当天最大连板天数
  getMaxCount() {
    const q = {
      question: '连续涨停天数第一名  去除st  去除科创',
    }

    return this.askQuestion(q).then((res) => {
      const {status_code, data = {}} = res;
      const answers = data.data || [];
      if (status_code === 0 && answers.length > 0) {
        const i = answers[0];
        const keys = Object.keys(i);
        for (let index = 0; index < keys.length; index++) {
          const k = keys[index];
          if (k.includes('连续涨停天数')) {
            return i[k];
          }
        }
        return 0;
      } else{
        return 0;
      }
    })
  }

  getAllData(count) {
    const items = []; 
    const  getNum = async (index = 1, resolve) => {
      let question = `连续涨停天数=${index} 去除ST 去除科创'`;
      if (index === 1) {
        question = '首板 去除st 去除科创';
      }
      const item = {
        question,
        key: index
      }
      const i = await this.getData(item) || 0;
      items.push(i);
      if (index < count) {
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

  getData(item) { 
    const {question} = item;
    return this.askQuestion(item).then((res) => {
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

  askQuestion(item) {
    const {question} = item;
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
    return Request.postJson(url, params, headers);
  }

  updateData(data) {
    Api.linkingBoardSave(data);
  }

}

module.exports = LinkingBoard;
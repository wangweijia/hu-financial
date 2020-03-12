// 热门板块
const Request = require('../utils/request');
const Api = require('../api');

class HotModule extends Object {
  constructor(props) {
    super(props);

    this.getData();
  }

  getData() {
    const url = 'https://baoer-api.xuangubao.cn/api/v2/tab/recommend';
    const params = {
      module: 'trending_plates'
    }
    return Request.getJson(url, params).then((res) => {
      const {code, data = {}} = res;
      if (code === 20000) {
        const {items = []} = data;
        console.log('热门板块:', items);
        return items;
      }
      return undefined;
    }).then((items) => {
      if (items) {
        this.updateDate({items});
      }
    });
  }

  updateDate(data) {
    Api.updateDate('hotModule', data);
  }
}

module.exports = HotModule;
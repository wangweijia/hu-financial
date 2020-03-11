// 热门板块

const Request = require('../utils/request');

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
        this.updateDate({items});
        return items;
      }
      return undefined;
    });
  }

  updateDate(data) {
    Request.post('http://118.190.162.218:9901/data/save', {
      table: 'hotModule',
      params: data
    }).then((res) => {
      // console.log(res);
    });
  }
}

module.exports = HotModule;
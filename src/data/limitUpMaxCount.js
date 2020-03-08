// limitUpDownCount
// 记录最热门的板块有几个个股涨停

const Request = require('../utils/request');

class LimitUpMaxCount extends Object {
  constructor(props) {
    super(props);

    this.info = {};

    this.getAllData();
  }

  async getAllData() {
    const plateId = await this.getModels();
    const stocksStr = await this.getStocks(plateId);
    const count = await this.getStockList(stocksStr);
    this.info['count'] = count;
    console.log('最热门的板块 and 个股涨停数(count):', this.info);
  }

  getModels() {
    const url = 'https://baoer-api.xuangubao.cn/api/v2/tab/recommend';
    const params = {
      module: 'trending_plates'
    }
    return Request.getJson(url, params).then((res) => {
      const {code, data = {}} = res;
      if (code === 20000) {
        const {items = []} = data;
        const item = items[0];
        const {plate_id, plate_name, description} = item || {}
        this.info['plate_name'] = plate_name;
        this.info['description'] = description;
        // console.log(item);
        return plate_id;
      }
      return undefined;
    });
  }

  getStocks(id) {
    const url = 'https://flash-api.xuangubao.cn/api/plate/plate_set';
    const params = {
      id
    };

    return Request.getJson(url, params).then((res) => {
      // console.log(res);
      const {code, data = {}} = res;
      if (code === 20000) {
        const {stocks = []} = data;
        let stocksStr = '';
        stocks.forEach((item, index) => {
          const {symbol} = item;
          const n = index === 0 ? '' : ',';
          stocksStr += `${n}${symbol}`;
        })
        // console.log(stocksStr);
        return stocksStr;
      }
      return undefined;
    });
  }

  getStockList(symbols) {
    const url = 'https://flash-api.xuangubao.cn/api/stock/data';
    const params = {
      symbols,
      fields: 'symbol,stock_chi_name,change_percent,price,turnover_ratio,non_restricted_capital,total_capital,per,limit_up_days,last_limit_up,limit_status,nearly_new_acc_pcp',
      strict: 'true'
    };

    return Request.getJson(url, params).then((res) => {
      // console.log(res);
      const {code, data = {}} = res;
      if (code === 20000) {
        const keys = Object.keys(data);
        const list = [];
        keys.forEach((key) => {
          const value = data[key];
          list.push(value);
        })
        return list;
      }
      return [];
    }).then((data) => {
      const newList = [];
      data.forEach((item) => {
        const {limit_status} = item;
        if (limit_status === 1) {
          newList.push(item);
        }
      });
      // console.log(newList);
      return newList;
    }).then((data = []) => {
      return data.length;
    });
  }
}

module.exports = LimitUpMaxCount;
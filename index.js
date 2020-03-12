const Emotion = require('./src/data/emotion');
const NorthwardCapital = require('./src/data/northwardCapital');
const LimitUpDownCount = require('./src/data/limitUpDownCount');
const LinkingBoard = require('./src/data/linkingBoard');
const LimitUpMaxCount = require('./src/data/limitUpMaxCount');
const HotModule = require('./src/data/hotModule');

const moment = require('moment');
class main {
  constructor() {
    console.log('-------------------------main');

    this.unableList = [
      // 'YYYY-MM-DD' #不可以使用的 日期，年-月-日
      // '2020-03-13'
    ];
  }

  todayEnable() {
    const m = moment();
    if (m.isoWeekday() === 6) {
      // 周六
      return false;
    }
    if (m.isoWeekday() === 7) {
      // 周日
      return false;
    }

    const timeF = m.format('YYYY-MM-DD');
    return !this.unableList.includes(timeF);
  }

  getInfo() {
    if (this.todayEnable()) {
      // 在正常交易日-运行

      this.emotion = new Emotion();
      this.northwardCapital = new NorthwardCapital();
      this.limitUpDownCount = new LimitUpDownCount();
      this.linkingBoard = new LinkingBoard();
      this.limitUpMaxCount = new LimitUpMaxCount();
      this.hotModule = new HotModule();
    }
  }
}

const m = new main();
// console.log(m.todayEnable());
m.getInfo();

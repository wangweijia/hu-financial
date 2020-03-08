// const fetch = require('node-fetch');
// const cheerio = require('cheerio')

// function getHtml(url) {
//   return fetch(url).then((res)=>{
//     return res.text();
//   }).then((res)=>{
//     console.log(res);
//     return res;
//   })
// }

// getHtml('https://www.cls.cn/').then((res) => {
//   const $ = cheerio.load(res);
//   console.log($.root().html());
//   // const a = $('span.north_1').html();
//   // console.log(a);
// })

// const url = 'http://push2.eastmoney.com/api/qt/kamt/get?fields1=f1,f2,f3,f4&fields2=f51,f52,f53,f54&ut=b2884a393a59ad64002292a3e90d46a5&cb=jQuery18306003229592301025_1583591663281&_=1583591724847'

// getHtml(url);

// import Emotion from './src/data/emotion';
const Emotion = require('./src/data/emotion');
const NorthwardCapital = require('./src/data/northwardCapital');
const LimitUpDownCount = require('./src/data/limitUpDownCount');
const LinkingBoard = require('./src/data/LinkingBoard');
const LimitUpMaxCount = require('./src/data/limitUpMaxCount');
const HotModule = require('./src/data/hotModule');

// const emotion = new Emotion();
// const northwardCapital = new NorthwardCapital();
// const limitUpDownCount = new LimitUpDownCount();
// const linkingBoard = new LinkingBoard();
// const limitUpMaxCount = new LimitUpMaxCount();
const hotModule = new HotModule();

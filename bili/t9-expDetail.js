const axios = require('axios')
const {headers} = require('./utils')
const {parse, isToday, parseISO, format} = require('date-fns');

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/member/web/exp/log?jsonp=jsonp',
    {
      params: {
        jsonp: 'jsonp'
      },
      headers
    },
  );
  let result = response.data;
  console.log(result);
  if (result.code === 0) {
    let expList = result.data.list;
    console.log(expList);
    let todayExpList = expList.filter(v => isToday(parseISO(v.time)));
    console.log(todayExpList);
    let todayExpTotal = todayExpList.map(v => v.delta)
      .reduce((v1, v2) => v1 + v2, 0);
    console.log('todayExpTotal: ', todayExpTotal);
  }
}

getCoin().then(console.log)
// let date = new Date();
// let date1 = parse('2020-12-15 21:45:51', 'yyyy-MM-dd HH:mm:ss', date );
// let date2 = parseISO('2020-12-15 02:45:51');
// console.log(date2);
// console.log(date, date1);
// console.log(format(date, 'yyyy-MM-dd HH:mm:ss'),
//   format(date1, 'yyyy-MM-dd HH:mm:ss'),
//   format(date2, 'yyyy-MM-dd HH:mm:ss'),
//   );
// console.log(isToday(date2));

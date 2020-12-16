const axios = require('axios')
const {headers} = require('./utils')
const {format} = require('date-fns');

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/popular', {
    params: {
      ps: 50,
      pn: 1,
    },
    headers,
  });
  let result = response.data;
  // console.log(result);
  if (result.code === 0) {
    let list = result.data.list;
    console.log(list);
    console.log(list.length);
    let t = list.map(value => value.ctime);
    let t2 = t.map(value => format(value * 1000, 'yyyy-MM-dd HH:mm:ss'));
    console.log(t);
    console.log(t2);
    // .map(value => new Date(value * 1000))
      // .forEach(console.log)
  }
}

getCoin().then(console.log)

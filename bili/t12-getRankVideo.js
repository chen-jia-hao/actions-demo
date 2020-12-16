const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/ranking/v2', {
    params: {
      rid: 0,
      type: 'all',
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
    let t2 = t.map(value => new Date(value * 1000));
    console.log(t);
    console.log(t2);
    // .map(value => new Date(value * 1000))
      // .forEach(console.log)
  }
}

getCoin().then(console.log)

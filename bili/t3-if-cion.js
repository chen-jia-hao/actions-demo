const axios = require('axios')
const {headers} = require('./utils')

async function ifCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/archive/coins', {
    params: {
      // bvid: 'BV1wy4y1D7JT'
      bvid: 'BV1ra4y1H7ih'
    },
    headers
  });
  let result = response.data;
  console.log(result);
  if (result.code === 0) {
    console.log(result.data.multiply)
  }
}

ifCoin().then(console.log)

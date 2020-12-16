const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/member/web/exp/reward', {
    headers,
  });
  let result = response.data;
  // console.log(result);
  if (result.code === 0) {
    console.log(result);
  }
}

getCoin().then(console.log)

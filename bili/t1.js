const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://account.bilibili.com/site/getCoin', {headers});
  let result = response.data;
  console.log(result);
  if (result.code === 0 && result.data.money) {
    console.log(result.data.money)
  }
}

getCoin().then(console.log)

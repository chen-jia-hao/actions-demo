const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/coin/today/exp', {headers});
  let result = response.data;
  console.log(result);
}

getCoin().then(console.log)

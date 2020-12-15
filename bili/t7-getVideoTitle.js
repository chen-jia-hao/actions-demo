const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/view', {
    params: {
      bvid: 'BV1ra4y1H7ih'
    },
    headers,
  });
  let result = response.data;
  console.log(result);
  if (result.code === 0) {
    console.log(result.data.title)
  }
}

getCoin().then(console.log)

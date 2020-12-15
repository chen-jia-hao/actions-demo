const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/popular', {
    params: {
      ps: 30,
      pn: 1,
    },
    headers,
  });
  let result = response.data;
  console.log(result);
  if (result.code === 0) {
    let list = result.data.list;
    console.log(list);
    console.log(list.length);
  }
}

getCoin().then(console.log)

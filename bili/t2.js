const axios = require('axios')
const qs = require('qs')
const {postHeaders} = require('./utils')

async function vipFetch() {
  let params = {
    type: 1,
    csrf: 'f2a118fc95fb9c9a0320bb4b579ff9d5',
  }
  let response = await axios.post('https://api.bilibili.com/x/vip/privilege/receive',
    qs.stringify(params),
    {headers: postHeaders},
    );
  let result = response.data;
  console.log(result);
}

vipFetch().then(console.log)

const axios = require('axios')
const qs = require('qs')
const {postHeaders, apiUrl} = require('./utils')

async function vipFetch() {
  let params = {
    bvid: 'BV1ra4y1H7ih',
    played_time: 40,
  }
  let response = await axios.post(apiUrl.watchVideo,
    qs.stringify(params),
    {headers: postHeaders},
    );
  let result = response.data;
  console.log(result);
}

vipFetch().then(console.log)

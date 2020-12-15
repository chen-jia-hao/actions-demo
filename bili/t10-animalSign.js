const axios = require('axios')
const qs = require('qs')
const {postHeaders} = require('./utils')

async function vipFetch() {
  let params = {
    platform: 'ios',
  }
  try {
    let response = await axios.post('https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn',
      qs.stringify(params),
      {headers: postHeaders},
    );
    let result = response.data;
    console.log(result);
    if (result.code === 0) {
      console.log('ok');
    } else {
      console.log('api fail');
    }
  } catch (e) {
      console.log('签到出错', e.toString(), '哔哩哔哩漫画已经签到过了');
  }
}

vipFetch().then(console.log)

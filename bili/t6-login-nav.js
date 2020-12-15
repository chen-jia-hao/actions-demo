const axios = require('axios')
const {headers} = require('./utils')

async function getCoin() {
  let response = await axios.get('https://api.bilibili.com/x/web-interface/nav', {headers});
  let result = response.data;
  console.log(result);
  // 接口调用成功
  if (result.code === 0) {
    // 处于登陆状态
    if (result.data.isLogin) {
      console.log('isLogin: ', result.data.isLogin)
      console.log('uname: ', result.data.uname)
      console.log('money: ', result.data.money)
    }
  }

}

getCoin().then(console.log)

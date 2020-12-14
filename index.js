const axios = require('axios');

async function init() {
  let res = await axios.get('http://www.baidu.com');
  console.log(res.data);
}

// init().then(console.log)
console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString())
const axios = require('axios');

async function init() {
  let res = await axios.get('http://www.baidu.com');
  console.log(res.data);
}

// init().then(console.log)
console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString())
console.log(process.env.VAR1, process.env.VAR2)
console.log(process.env)

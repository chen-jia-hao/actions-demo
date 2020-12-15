const axios = require('axios')
const qs = require('qs')
const {format} = require('date-fns')

const SCKEY = process.env.SCKEY

async function init() {
  let data = {
    text: 'hi cjh',
    desp: `date --> ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
  }
  let res = await axios.post(`https://sc.ftqq.com/${SCKEY}.send`, qs.stringify(data))
  console.log(res.data)
}

init().then(console.log)
console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))

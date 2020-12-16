const {format} = require('date-fns')
const {dailyJob} = require('./bili/task')

dailyJob().then(console.log)
console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))

const mq = require('./mq')

const random = (max) =>  Math.floor(Math.random() * Math.floor(max))

let task = 1
const interval = setInterval(() => {
  mq.publish('tasks', { id: task, duration: random(10000) }).then(sent => {
    console.log(`Produced task with id ${task}`)
    task = task + 1
  }).catch(console.warn)
}, 1000)

const mq = require('./mq')

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

mq.registerConsumer('tasks', (message) => {
  const task = JSON.parse(message.content.toString())
  return sleep(task.duration).then(() => {
    console.log(`Task ${task.id} processed after ${task.duration} milliseconds!`)
  })
})

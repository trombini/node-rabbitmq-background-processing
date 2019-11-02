const mq = require('./mq')

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const fibonacci = (n) => (n == 0 || n == 1) ? n : fibonacci(n - 1) + fibonacci(n - 2)

const processTask = async (task) => {
  console.log(`Start processing task ${task.id}`)
  await sleep(task.duration)
  console.log(`Task ${task.id} processed after ${task.duration} milliseconds!`)
}

async function consumeBlocking() {
  const queue = 'tasks'
  console.log(`Waiting for messages in queue '${queue}'`)

  while(true) {
    const message = await mq.get(queue)
    const task = await JSON.parse(message.content.toString())

    await processTask(task)
    await mq.ack(message)
  }
}

consumeBlocking().catch(console.warn)


// mq.get('tasks').then(message => {
//   const task = JSON.parse(message.content.toString())
//   console.log(`Task ${task.id}`)
//   mq.ack(message)
// })

// mq.registerConsumer('tasks', processMessage)

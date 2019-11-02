
const amqp = require('amqplib')

const url = 'amqp://localhost'
const connection = amqp.connect(url)
const channel = connection.then(conn => conn.createChannel())

const publish = (queue, message) => {
  return channel.then(ch => {
    return ch.assertQueue(queue).then(ok => {
      return ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    })
  })
}
const get = (queue) => {
  return channel.then(ch => {
    return ch.assertQueue(queue).then(ok => {
      return ch.get(queue, {})
    })
  })
}

const ack = (message) => channel.then(ch => ch.ack(message))

const registerConsumer = (queue, callback) => {
  console.log(`[*] Waiting for messages in queue '${queue}'`);
  channel.then(ch => {
    ch.assertQueue(queue).then(ok => {
      ch.consume(queue, async (msg) => {
        const json = await JSON.parse(msg.content.toString())
        console.log(`[x] Received ${msg.content.toString()}`)
        await callback(json)
        console.log(`[x] ACK ${msg.content.toString()}`)
        ch.ack(msg)
      },  { noAck: false })
    })
  })
}

module.exports = { publish, registerConsumer, get, ack }

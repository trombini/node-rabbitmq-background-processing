
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

const registerConsumer = (queue, callback) => {
  console.log(`[*] Waiting for messages in queue '${queue}'`);
  channel.then(ch => {
    ch.assertQueue(queue).then(ok => {
      ch.consume(queue, async (message) => {
        console.log(`[x] Received ${message.content.toString()}`)
        await callback(message)
        console.log(`[x] ACK ${message.content.toString()}`)
        ch.ack(message)
      },  { noAck: false })
    })
  })
}

module.exports = { publish, registerConsumer }

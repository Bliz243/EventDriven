const express = require('express')
const amqplib = require('amqplib')
const path = require('path')

rabbit_host = process.env.RABBIT_HOST
rabbit_port = process.env.RABBIT_PORT
rabbit_user = process.env.RABBIT_USERNAME
rabbit_password = process.env.RABBIT_PASSWORD

var amqp_url = 'amqp://' + rabbit_user + ':' + rabbit_password + '@' + rabbit_host + ':' + rabbit_port

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.get('/rabbitmq', async (req, res) => {
  const messages = []
  var connection = await amqplib.connect(amqp_url)
  var channel = await connection.createChannel()
  var queue = 'test_queue'
  await connection.createChannel()
  await channel.assertQueue(queue, { durable: true })
  await channel.consume(
    queue,
    function (msg) {
      messages.push(msg.content.toString())
      console.log(msg.content.toString())
      channel.ack(msg)
      channel.cancel('consumer')
    },
    { consumerTag: 'consumer' },
  )
  setTimeout(function () {
    channel.close()
    connection.close()
  }, 500)
  res.json({ messages })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

const amqp = require('amqplib');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

async function subscribeAndSendToClient() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'taskQueue';

  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server);

  app.use(express.static('public'));

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  await channel.assertQueue(queue);

  channel.prefetch(1); // Process one message at a time

  channel.consume(queue, (message) => {
    const data = JSON.parse(message.content.toString());
    if (data.value >= 7) {
      console.log(`Filtered (priority): ${JSON.stringify(data)}`);
      io.emit('filteredData', data);
    }
    channel.ack(message);
  });

  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}

subscribeAndSendToClient().catch(console.error);

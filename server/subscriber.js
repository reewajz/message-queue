const amqp = require('amqplib');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

async function subscribeAndSendToClient() {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queue = 'taskQueue';

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(express.static('public'));

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  await channel.assertQueue(queue, { durable: true });

  await channel.prefetch(1); // Process one message at a time

  await channel.consume(queue, async (message) => {
    const data = JSON.parse(message.content.toString());

    try {
      if (data.value >= 7) {
        console.log(`Filtered (priority): ${JSON.stringify(data)}`);
      }
      console.log(`Received message: ${message.content.toString()}`);

      channel.ack(message);
    } catch (error) {
      console.error('Error processing message:', error);
      channel.reject(message, false);
    }
  });

  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
}

subscribeAndSendToClient().catch(console.error);

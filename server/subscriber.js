const amqp = require('amqplib');
const express = require('express');
const http = require('http');
// const { Server } = require('socket.io');
const cors = require('cors');


async function subscribeAndSendToClient() {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queue = 'taskQueue';

  const app = express();
  const server = http.createServer(app);
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    }
  });


  app.use(cors()); // Enable CORS middleware
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
      const priority = message?.properties?.priority;
      if (priority && priority >= 7) {
        console.log(`Filtered (priority): ${JSON.stringify(data)}`);
        io.emit('filteredData', data);
      }
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

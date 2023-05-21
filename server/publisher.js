const amqp = require('amqplib');
const { getRandomNumber } = require('./utils');

async function messagePublisher() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'taskQueue';

  setInterval(() => {
    const data = {
      timestamp: Date.now(),
      value: getRandomNumber()
    };
    console.log(getRandomNumber(10))
    console.log(getRandomNumber(10))

    const message = JSON.stringify(data);
    channel.sendToQueue(queue, Buffer.from(message), {
      priority: getRandomNumber(10)
    });
    console.log(`message published: ${message}`);
  }, 50); // Publish 20 messages per second
}

messagePublisher().catch(console.error);

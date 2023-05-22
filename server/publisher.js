const amqp = require('amqplib');
const { getRandomNumber } = require('./utils');

async function publisher() {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queue = 'taskQueue';

  const startTime = new Date().getTime();

  let interval = setInterval(() => {
    // to clear interval after 30 seconds
    if (new Date().getTime() - startTime > 10000) {
      clearInterval(interval);
      return;
    }
    const data = {
      timestamp: Date.now(),
      // todo: need to get random phrase
      value: getRandomNumber()
    };

    const message = JSON.stringify(data);
    channel.sendToQueue(queue, Buffer.from(message), {
      priority: getRandomNumber(10)
    });
    console.log(`message published: ${message}`);
  }, 50); // Publish 20 messages per second
}

publisher().catch(console.error);

# message-queue

This project simulates a high-volume data input environment using an open-source message queue with Node.js, using RabbitMQ as the message queue, and implements a publisher and subscriber using Node.js. Additionally, I have used Socket.IO to send filtered messages.

# To run locally

cd client
npm i
npm run build
npm run start

cd server
npm i
npm run start

<!-- for rabbitmq -->

docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management

# using docker

docker-compose up

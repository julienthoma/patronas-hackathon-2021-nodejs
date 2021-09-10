import express from 'express';
import { Kafka } from 'kafkajs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
const port = 3001;
const brokers: string | undefined = process.env.KAFKA_BROKERS;

if (!brokers) {
  throw new Error('please set env variable KAFKA_BROKERS');
}

const kafka = new Kafka({
  clientId: 'nodejs-api',
  brokers: brokers.split(','),
});

const initKafka = async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'liveHLDM', fromBeginning: true });

  await consumer.run({
    eachMessage: async payload => {
      console.log({
        value: payload.message.value?.toString(),
      });
    },
  });
};

io.on('connection', socket => {
  console.log('user connected');
});

function sendTime() {
  io.emit('time', { time: new Date().toJSON() });
}

setInterval(sendTime, 2000);

initKafka();
app.get('/', function (req, res) {
  res.json({ wee: 'wee' });
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

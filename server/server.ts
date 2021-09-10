import express from 'express';
import { Kafka } from 'kafkajs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import faker from 'faker';
import { IKillFeedItem, SocketMessageType } from '../shared/types';

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
  const consumer = kafka.consumer({ groupId: 'nodejs' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'raw-live-data', fromBeginning: false });

  await consumer.run({
    eachMessage: async payload => {
      console.log(payload.message.value?.toString());
      const killFeedItem: IKillFeedItem = {
        timestamp: new Date().toISOString(),
        killer: faker.internet.userName(),
        target: faker.internet.userName(),
        weapon: faker.random.arrayElement(['9mmAR', 'gluon gun', 'crowbar', 'rpg_rocket']),
      };
      io.emit(SocketMessageType.KILL_FEED, killFeedItem);
    },
  });

  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: 'test-julien',
    messages: [{ key: 'test', value: 'Hello' }],
  });
};

io.on('connection', socket => {
  console.log('user connected');
});

initKafka();
app.get('/', function (req, res) {
  res.json({ wee: 'wee' });
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

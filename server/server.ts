// @ts-ignore
import express from 'express';
import { Kafka } from 'kafkajs';
import { createServer } from 'http';
import shortid from 'shortid';
import { Server } from 'socket.io';
import cors from 'cors';
import { IKillFeedItem, IPlayer, KillStreak, SocketMessageType } from '../shared/types';
import {
  IConnectEvent,
  isConnectMessage,
  parseConnectEvent,
  rawToCleanedRaw,
} from './MessageParser';
import * as fs from 'fs';

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
  clientId: 'nodejs-api-julien',
  brokers: brokers.split(','),
});

const killStreakEventMap: Record<number, KillStreak> = {
  2: KillStreak.DOUBLE_KILL,
  3: KillStreak.MULTI_KILL,
  4: KillStreak.MEGA_KILL,
  5: KillStreak.ULTRA_KILL,
  6: KillStreak.MONSTER_KILL,
  7: KillStreak.MONSTER_KILL,
  8: KillStreak.MONSTER_KILL,
  9: KillStreak.MONSTER_KILL,
  10: KillStreak.GOD_LIKE,
};

const getKillStreak = (kills: number): KillStreak => {
  return killStreakEventMap[kills] || KillStreak.GOD_LIKE;
};

const players: Record<string, IPlayer> = {};
const last10KillFeedItems: IKillFeedItem[] = [];
const connectionEvents: IConnectEvent[] = [];

const initKafka = async () => {
  const admin = kafka.admin();
  await admin.connect();
  const topicOffsetKillMessages = await admin.fetchTopicOffsets('hl-kill-messages');
  const topicOffsetRaw = await admin.fetchTopicOffsets('raw-live-data');
  console.log(topicOffsetKillMessages);
  const consumer = kafka.consumer({ groupId: shortid.generate() });
  const consumerPlayer = kafka.consumer({ groupId: shortid.generate() });
  await consumer.connect();
  await consumerPlayer.connect();
  await consumer.subscribe({ topic: 'hl-kill-messages', fromBeginning: false });
  await consumerPlayer.subscribe({ topic: 'hl-kill-messages', fromBeginning: true });

  const temp: string[] = [];

  // Clean up RAW
  const cleanUpConsumer = kafka.consumer({ groupId: shortid.generate() });
  await cleanUpConsumer.connect();
  await cleanUpConsumer.subscribe({ topic: 'raw-live-data', fromBeginning: true });
  await cleanUpConsumer.run({
    eachMessage: async payload => {
      const cleanedMessageValue = rawToCleanedRaw(payload.message.value);

      if (isConnectMessage(cleanedMessageValue)) {
        connectionEvents.push(parseConnectEvent(cleanedMessageValue, payload.message.timestamp));
      }

      if (parseInt(payload.message.offset) < parseInt(topicOffsetRaw[0].high)) {
        return;
      }
      io.emit(SocketMessageType.CONNECT_FEED, connectionEvents);
    },
  });

  cleanUpConsumer.seek({
    topic: 'raw-live-data',
    offset: '0',
    partition: 0,
  });

  // Kill Stream
  await consumer.run({
    eachMessage: async payload => {
      const killFeedItem: IKillFeedItem | null = payload.message.value
        ? JSON.parse(payload.message.value?.toString())
        : null;
      io.emit(SocketMessageType.KILL_FEED, killFeedItem);

      if (!killFeedItem) {
        return;
      }

      if (last10KillFeedItems.length === 10) {
        last10KillFeedItems.pop();
      }
      last10KillFeedItems.unshift(killFeedItem);

      if (players[killFeedItem.killer].killStreak >= 2) {
        io.emit(
          SocketMessageType.KILL_STREAK_EVENT,
          getKillStreak(players[killFeedItem.killer].killStreak)
        );
      }
    },
  });

  await consumer.seek({
    topic: 'hl-kill-messages',
    offset: String(parseInt(topicOffsetKillMessages[0].high) - 10),
    partition: 0,
  });

  await consumerPlayer.run({
    eachMessage: async payload => {
      const killFeedItem: IKillFeedItem | null = payload.message.value
        ? JSON.parse(payload.message.value?.toString())
        : null;

      if (!killFeedItem) {
        return;
      }

      if (killFeedItem.killer) {
        if (!players[killFeedItem.killer]) {
          players[killFeedItem.killer] = {
            name: killFeedItem.killer,
            steamId: 'asd',
            kills: 0,
            deaths: 0,
            killStreak: 0,
          };
        }

        players[killFeedItem.killer].kills++;
        players[killFeedItem.killer].killStreak++;
      }

      if (!players[killFeedItem.target]) {
        players[killFeedItem.target] = {
          name: killFeedItem.target,
          steamId: 'asd',
          kills: 0,
          deaths: 0,
          killStreak: 0,
        };
      }

      players[killFeedItem.target].deaths++;
      players[killFeedItem.target].killStreak = 0;

      if (parseInt(payload.message.offset) < parseInt(topicOffsetKillMessages[0].high)) {
        return;
      }
      io.emit(SocketMessageType.PLAYER_FEED, players);
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
  socket.emit(SocketMessageType.PLAYER_FEED, players);
  socket.emit(SocketMessageType.CONNECT_FEED, connectionEvents);
  last10KillFeedItems.map(item => socket.emit(SocketMessageType.KILL_FEED, item));
});

initKafka();
app.get('/', function (req, res) {
  res.json({ wee: 'wee' });
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

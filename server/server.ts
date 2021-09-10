import express from 'express';
import { Kafka } from 'kafkajs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { IKillFeedItem, IPlayer, KillStreak, SocketMessageType } from '../shared/types';

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
const groupId: string | undefined = process.env.KAFKA_GROUP_ID;

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
const playerKillStreak: Record<string, number> = {};

const initKafka = async () => {
  const consumer = kafka.consumer({ groupId: groupId ? groupId : 'nodejs-julien' });
  const consumerPlayer = kafka.consumer({ groupId: `${groupId ? groupId : 'nodejs-julien'}-2` });
  await consumer.connect();
  await consumerPlayer.connect();
  await consumer.subscribe({ topic: 'hl-kill-messages', fromBeginning: false });
  await consumerPlayer.subscribe({ topic: 'hl-kill-messages', fromBeginning: true });

  await consumer.run({
    eachMessage: async payload => {
      const killFeedItem: IKillFeedItem | null = payload.message.value
        ? JSON.parse(payload.message.value?.toString())
        : null;
      io.emit(SocketMessageType.KILL_FEED, killFeedItem);

      if (!killFeedItem) {
        return;
      }

      if (killFeedItem.killer) {
        if (!playerKillStreak[killFeedItem.killer]) {
          playerKillStreak[killFeedItem.killer] = 0;
        }

        playerKillStreak[killFeedItem.killer]++;
      }

      if (playerKillStreak[killFeedItem.target]) {
        playerKillStreak[killFeedItem.target] = 0;
      }

      if (playerKillStreak[killFeedItem.killer] >= 2) {
        io.emit(
          SocketMessageType.KILL_STREAK_EVENT,
          getKillStreak(playerKillStreak[killFeedItem.killer])
        );
        console.log(getKillStreak(playerKillStreak[killFeedItem.killer]));
      }
    },
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
          };
        }

        players[killFeedItem.killer].kills++;
      }

      if (!players[killFeedItem.target]) {
        players[killFeedItem.target] = {
          name: killFeedItem.target,
          steamId: 'asd',
          kills: 0,
          deaths: 0,
        };
      }

      players[killFeedItem.target].deaths++;

      io.emit(SocketMessageType.PLAYER_FEED, players);
    },
  });

  await consumerPlayer.seek({ topic: 'hl-kill-messages', offset: '0', partition: 0 });

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

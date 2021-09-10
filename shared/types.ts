export enum SocketMessageType {
  KILL_FEED = 'KILL_FEED',
  PLAYER_FEED = 'PLAYER_FEED',
  KILL_STREAK_EVENT = 'KILL_STREAK_EVENT',
}

export interface IKillFeedItem {
  killer: string;
  target: string;
  weapon: string;
  killerWonId: string;
  targetWonId: string;
}

export interface IPlayer {
  name: string;
  steamId: string;
  kills: number;
  deaths: number;
  isOnline?: boolean;
}

export enum KillStreak {
  DOUBLE_KILL = 'DOUBLE_KILL',
  MULTI_KILL = 'MULTI_KILL',
  MEGA_KILL = 'MEGA_KILL',
  ULTRA_KILL = 'ULTRA_KILL',
  MONSTER_KILL = 'MONSTER_KILL',
  GOD_LIKE = 'GOD_LIKE',
}

export interface IKillStreak {
  name: KillStreak;
}

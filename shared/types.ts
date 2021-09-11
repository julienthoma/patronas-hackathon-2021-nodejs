export enum SocketMessageType {
  KILL_FEED = 'KILL_FEED',
  PLAYER_FEED = 'PLAYER_FEED',
  KILL_STREAK_EVENT = 'KILL_STREAK_EVENT',
  CONNECT_FEED = 'CONNECT_FEED',
  WEAPONS = 'WEAPONS',
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
  killStreak: number;
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

export interface IWeaponStats {
  count: number;
  players: Record<string, number>;
}

export type IWeaponMap = Record<string, IWeaponStats>;
export type IPlayerMap = Record<string, IPlayer>;

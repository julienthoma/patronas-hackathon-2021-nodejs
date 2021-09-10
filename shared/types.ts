export enum SocketMessageType {
  KILL_FEED = 'KILL_FEED',
}

export interface IKillFeedItem {
  killer: string;
  target: string;
  weapon: string;
  killerWonId: string;
  targetWonId: string;
}

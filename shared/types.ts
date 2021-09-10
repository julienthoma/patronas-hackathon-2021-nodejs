export enum SocketMessageType {
  KILL_FEED = 'KILL_FEED',
}

export interface IKillFeedItem {
  killer: string;
  timestamp: string;
  target: string;
  weapon: string;
}

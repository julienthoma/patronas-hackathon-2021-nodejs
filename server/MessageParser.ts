export const rawToCleanedRaw = (value: Buffer | null): string => {
  if (!value) {
    return '';
  }
  return value.toString().substring(11).replace(new RegExp(/\\"/, 'g'), '').replace('\n\u0000', '');
};

export interface IConnectEvent {
  playerName: string;
  steamId: string;
  timestamp: string;
  isConnectEvent: boolean;
}

export const parseConnectEvent = (message: string, timestamp: string): IConnectEvent => {
  const match = /:\s"(.*)<.*><(.*)><.*>/.exec(message);

  if (!match) {
    console.log('parsing error');
    console.log(message);
    throw new Error('connect parsing error');
  }

  const [_, name, steamId] = match;

  return {
    isConnectEvent: message.endsWith('entered the game'),
    playerName: name,
    steamId: steamId,
    timestamp,
  };
};

export const isConnectMessage = (message: string): boolean => {
  return (
    message.endsWith('entered the game') ||
    message.endsWith('disconnected') ||
    message.includes('was kicked by "Console"')
  );
};

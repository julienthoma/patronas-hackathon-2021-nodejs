import { IConnectEvent, parseConnectEvent, rawToCleanedRaw } from './MessageParser';

test('rawToCleanedRaw', () => {
  const buffer = Buffer.from([
    255, 255, 255, 255, 108, 111, 103, 32, 76, 32, 48, 57, 47, 49, 48, 47, 50, 48, 50, 49, 32, 45,
    32, 49, 50, 58, 52, 51, 58, 49, 51, 58, 32, 34, 84, 72, 69, 45, 76, 105, 111, 110, 60, 51, 52,
    62, 60, 83, 84, 69, 65, 77, 95, 48, 58, 48, 58, 54, 50, 50, 56, 52, 51, 51, 50, 48, 62, 60, 51,
    52, 62, 34, 32, 107, 105, 108, 108, 101, 100, 32, 34, 84, 104, 101, 80, 117, 110, 105, 115, 104,
    101, 114, 60, 50, 53, 62, 60, 83, 84, 69, 65, 77, 95, 48, 58, 49, 58, 54, 50, 50, 56, 52, 48,
    55, 50, 51, 62, 60, 50, 53, 62, 34, 32, 119, 105, 116, 104, 32, 34, 57, 109, 109, 104, 97, 110,
    100, 103, 117, 110, 34, 10, 0,
  ]);

  const result = rawToCleanedRaw(buffer);

  expect(result).toBe(
    '9/10/2021 - 12:43:13: "THE-Lion<34><STEAM_0:0:622843320><34>" killed "ThePunisher<25><STEAM_0:1:622840723><25>" with "9mmhandgun"'
  );
});

test('parseConnectEvent entered the game', () => {
  const connectString =
    '9/11/2021 - 10:45:43: "!Killer_King!<27><STEAM_0:1:622964031><27>" entered the game';

  const result = parseConnectEvent(connectString, 'asd');

  const expectedResult: IConnectEvent = {
    timestamp: 'asd',
    steamId: 'STEAM_0:1:622964031',
    playerName: '!Killer_King!',
    isConnectEvent: true,
  };
  expect(result).toEqual(expectedResult);
});

test('parseConnectEvent disconnected', () => {
  const disconnectedString = '9/11/2021 - 11:15:57: "Lox<31><STEAM_0:0:1441739><31>" disconnected';

  const result = parseConnectEvent(disconnectedString, 'asd');

  const expectedResult: IConnectEvent = {
    timestamp: 'asd',
    steamId: 'STEAM_0:0:1441739',
    playerName: 'Lox',
    isConnectEvent: false,
  };
  expect(result).toEqual(expectedResult);
});

test('parseConnectEvent kicked', () => {
  const kickedEvent =
    '"9/10/2021 - 20:00:47: Kick: "Leonardo<61><STEAM_0:0:123294480><>" was kicked by "Console" (message "test")';

  const result = parseConnectEvent(kickedEvent, 'asd');

  const expectedResult: IConnectEvent = {
    timestamp: 'asd',
    steamId: 'STEAM_0:0:123294480',
    playerName: 'Leonardo',
    isConnectEvent: false,
  };
  expect(result).toEqual(expectedResult);
});

import { EachMessagePayload } from 'kafkajs';

export interface ICleanedBaseMessage {
  timestamp: string;
  message: string;
}

export const rawToCleanedRaw = ({ message }: EachMessagePayload): ICleanedBaseMessage => ({
  timestamp: message.timestamp,
  message: message.value
    ? message.value.toString().substring(11).replace(new RegExp(/\\"/, 'g'), '')
    : '',
});

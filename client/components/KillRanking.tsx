import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Name } from './Name';
import React from 'react';
import { IPlayer } from '../../shared/types';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export const KillRanking = ({
  players,
  connectedPlayers,
}: {
  players: IPlayer[];
  connectedPlayers: IPlayer[];
}): JSX.Element => {
  return (
    <>
      <Box display="flex">
        <Box p={2} width={56} textAlign="center">
          #
        </Box>
        <Box p={2} flex={1}>
          Player
        </Box>
        <Box p={2} width={192}>
          Kills
        </Box>
        <Box p={2} width={192}>
          Deaths
        </Box>
        <Box p={2} width={192}>
          K/D
        </Box>
      </Box>
      {players
        .sort((a, b) => b.kills - a.kills)
        .map((player, index) => {
          return (
            <Box
              borderRadius={4}
              key={index}
              m={0.5}
              display="flex"
              alignItems="center"
              position="relative"
              className={player.killStreak >= 5 ? 'onfire' : ''}
            >
              <Box p={2} width={56} bgcolor="rgba(33, 33, 33, 0.75)" textAlign="center">
                {index + 1}.
              </Box>
              <Box p={2} flex={1} bgcolor="#262424" alignItems="center" display="flex">
                {player.name} &nbsp;
                {connectedPlayers.find(p => p.steamId === player.steamId) && (
                  <FiberManualRecordIcon fontSize="small" style={{ color: 'green' }} />
                )}
              </Box>
              <Box p={2} width={192} bgcolor="rgba(33, 33, 33, 0.75)">
                <div className="kill" key={player.kills}>
                  {player.kills}
                </div>
              </Box>
              <Box p={2} width={192} bgcolor="rgba(33, 33, 33, 0.75)">
                <div className="death" key={player.deaths}>
                  {player.deaths}
                </div>
              </Box>
              <Box p={2} width={192} bgcolor="#262424">
                {(player.kills / player.deaths).toFixed(2)}
              </Box>
            </Box>
          );
        })}
    </>
  );
};

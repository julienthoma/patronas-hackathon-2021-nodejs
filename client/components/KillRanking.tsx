import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Name } from './Name';
import React from 'react';
import { IPlayer } from '../../shared/types';

export const KillRanking = ({ players }: { players: IPlayer[] }): JSX.Element => (
  <TableContainer component={Paper}>
    <Box key={9999} m={0.5} height={56} display="flex" alignItems="center">
      <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
        Player
      </Box>
      <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
        Kills
      </Box>
      <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
        Deaths
      </Box>
      <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
        K/D
      </Box>
    </Box>
    {players
      .sort((a, b) => b.kills - a.kills)
      .map((player, index) => {
        return (
          <Box key={index} m={0.5} height={56} display="flex" alignItems="center" bgcolor="#262424">
            <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
              <Name name={player.name} />
            </Box>
            <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
              {player.kills}
            </Box>
            <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
              {player.deaths}
            </Box>
            <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
              {(player.kills / player.deaths).toFixed(2)}
            </Box>
          </Box>
        );
      })}
  </TableContainer>
);

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Name } from './Name';
import React from 'react';
import { IPlayer } from '../../shared/types';

export const KillRanking = ({ players }: { players: IPlayer[] }): JSX.Element => (
  <>
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
          <Box
            key={index}
            m={0.5}
            height={56}
            display="flex"
            alignItems="center"
            bgcolor="rgba(33, 33, 33, 0.75)"
            position="relative"
          >
            {player.killStreak >= 8 && (
              <div
                className={player.killStreak > 5 ? 'circle circle-red' : 'circle'}
                style={{ transform: 'scale(1)' }}
              >
                <svg>
                  <filter id="wavy">
                    <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" speed="2">
                      <animate
                        attributeName="baseFrequency"
                        dur="60s"
                        values="0.02; 0.005; 0.02"
                        repeatCount="indefinite"
                      />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
                  </filter>
                </svg>
              </div>
            )}

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
  </>
);

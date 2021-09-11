import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Name } from './Name';
import React from 'react';
import { IPlayer } from '../../shared/types';

export const KillRanking = ({ players }: { players: IPlayer[] }): JSX.Element => {
  const foo = () => {
    console.log('change happend');
  };
  return (
    <>
      <Box display="flex" gridColumnGap={2}>
        <Box p={2} width={56} textAlign="center">
          #
        </Box>
        <Box p={2} width={192}>
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

              <Box p={2} width={56} bgcolor="rgba(33, 33, 33, 0.75)" textAlign="center">
                {index + 1}.
              </Box>
              <Box p={2} width={192} bgcolor="#262424">
                {player.name}
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

import { KillFeedItem } from '../types';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IKillFeedItem, IPlayer, IPlayerMap, IWeaponMap } from '../../shared/types';
import { Box, TableHead } from '@material-ui/core';
import { Name } from './Name';
import { Weapon } from './Weapon';

interface Props {
  weapons: IWeaponMap;
  playerMap: IPlayerMap;
}

export const WeaponList = ({ weapons, playerMap }: Props): JSX.Element => {
  return (
    <div>
      <Box>
        <Box p={2} width={192}>
          Weapons
        </Box>
      </Box>
      {Object.keys(weapons)
        .sort((a, b) => weapons[b].count - weapons[a].count)
        .map((key: string) => {
          const playerWithMostKills = Object.keys(weapons[key].players)
            .sort((a, b) => weapons[key].players[b] - weapons[key].players[a])
            .map(steamId => playerMap[steamId])[0];

          console.log(playerWithMostKills);
          console.log(key);

          return (
            <Box
              borderRadius={4}
              key={key}
              m={0.5}
              display="flex"
              alignItems="center"
              bgcolor="#262424"
            >
              <Box
                className="player"
                p={2}
                maxWidth={200}
                white-space="nowrap"
                overflow="hidden"
                text-overflow="ellipsis"
              >
                <Box height={24} style={{ transform: 'scaleX(-1)' }}>
                  <Weapon weaponName={key} />
                </Box>
              </Box>
              <Box
                p={2}
                maxWidth={200}
                white-space="nowrap"
                overflow="hidden"
                text-overflow="ellipsis"
              >
                {weapons[key].count}
              </Box>
              <Box
                p={2}
                maxWidth={200}
                white-space="nowrap"
                overflow="hidden"
                text-overflow="ellipsis"
              >
                {playerWithMostKills ? playerWithMostKills.name : ''} (
                {playerWithMostKills ? weapons[key].players[playerWithMostKills.steamId] : ''})
              </Box>
            </Box>
          );
        })}
    </div>
  );
};

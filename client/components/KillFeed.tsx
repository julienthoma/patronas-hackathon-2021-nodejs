import { KillFeedItem } from '../types';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IKillFeedItem } from '../../shared/types';
import { Box, TableHead } from '@material-ui/core';
import { Pistol } from './weapons/Pistol';
import { Crowbar } from './weapons/Crowbar';
import { ColtPython357Magnum } from './weapons/ColtPython357Magnum';
import { MP5 } from './weapons/MP5';
import { AssaultShotgun } from './weapons/AssaultShotgun';
import { Crossbow } from './weapons/Crossbow';
import { RPG } from './weapons/RPG';
import { GlounGun } from './weapons/GlounGun';
import { TauCanon } from './weapons/TauCanon';
import { Name } from './Name';
import { Death } from './weapons/Death';
import { Snark } from './weapons/Snark';
import { Tripmine } from './weapons/Tripmine';
import { Grenade } from './weapons/Grenade';
import { Stachel } from './weapons/Stachel';
import { Hornet } from './weapons/Hornet';

interface Props {
  killFeedItems: IKillFeedItem[];
}

export const KillFeed = ({ killFeedItems }: Props): JSX.Element => {
  const weapon_mapping: Record<string, any> = {
    crowbar: <Crowbar />,
    '9mmhandgun': <Pistol />,
    '357': <ColtPython357Magnum />,
    '9mmAR': <MP5 />,
    shotgun: <AssaultShotgun />,
    crossbow: <Crossbow />,
    rpg_rocket: <RPG />,
    hornet: <Hornet />,
    grenade: <Grenade />,
    'gluon gun': <GlounGun />,
    tau_cannon: <TauCanon />,
    world: <Death />,
    snark: <Snark />,
    satchel: <Stachel />,
    tripmine: <Tripmine />,
  };

  const resolveWeapon = (weapon: string) => {
    console.log(weapon);
    if (weapon === null) {
      return <Death />;
    }
    return weapon_mapping[weapon];
  };

  return (
    <div>
      {killFeedItems.map((killFeedItem, index) => {
        return (
          <Box key={index} m={0.5} height={56} display="flex" alignItems="center" bgcolor="#262424">
            <Box
              className="player"
              p={2}
              maxWidth={200}
              white-space="nowrap"
              overflow="hidden"
              text-overflow="ellipsis"
            >
              <Name name={killFeedItem.killer} />
            </Box>
            <Box p={1} height={48} style={{ transform: 'scaleX(-1)' }}>
              {resolveWeapon(killFeedItem.weapon)}
            </Box>
            <Box p={2} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
              <Name name={killFeedItem.target} />
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

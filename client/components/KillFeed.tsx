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
import { TableHead } from '@material-ui/core';
import { Pistol } from './weapons/Pistol';
import { Crowbar } from './weapons/Crowbar';
import { ColtPython357Magnum } from './weapons/ColtPython357Magnum';
import { MP5 } from './weapons/MP5';
import { AssaultShotgun } from './weapons/AssaultShotgun';
import { Crossbow } from './weapons/Crossbow';
import { RPG } from './weapons/RPG';
import { HandGrenade } from './weapons/HandGrenade';
import { StachelCharge } from './weapons/StachelCharge';
import { GlounGun } from './weapons/GlounGun';
import { TauCanon } from './weapons/TauCanon';
import { Name } from './Name';

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
    gauss: null,
    egon: null,
    hornet: null,
    handgrenade: <HandGrenade />,
    'gluon gun': <GlounGun />,
    tau_cannon: <TauCanon />,
  };
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableCell>Killer</TableCell>
          <TableCell>Weapon</TableCell>
          <TableCell>Target</TableCell>
        </TableHead>
        <TableBody>
          {killFeedItems.map((killFeedItem, index) => (
            <TableRow style={index % 2 ? { background: 'black' } : { background: 'grey' }}>
              <TableCell>
                <Name name={killFeedItem.killer} />
              </TableCell>
              <TableCell>{weapon_mapping[killFeedItem.weapon]}</TableCell>
              <TableCell>
                <Name name={killFeedItem.target} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

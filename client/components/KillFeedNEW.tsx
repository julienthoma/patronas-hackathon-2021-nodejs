import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { IKillFeedItem } from '../../shared/types';
import { Box } from '@material-ui/core';
import { Pistol } from './weapons/Pistol';
import { Crowbar } from './weapons/Crowbar';
import { ColtPython357Magnum } from './weapons/ColtPython357Magnum';
import { MP5 } from './weapons/MP5';
import { AssaultShotgun } from './weapons/AssaultShotgun';
import { Crossbow } from './weapons/Crossbow';
import { RPG } from './weapons/RPG';
import { Grenade } from './weapons/Grenade';
import { GlounGun } from './weapons/GlounGun';
import { TauCanon } from './weapons/TauCanon';
import { Name } from './Name';

interface Props {
  killFeedItems: IKillFeedItem[];
}

export const KillFeedNew = ({ killFeedItems }: Props): JSX.Element => {
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
    handgrenade: <Grenade />,
    'gluon gun': <GlounGun />,
    tau_cannon: <TauCanon />,
  };
  return (
    <TableContainer component={Paper}>
      {killFeedItems.map((killFeedItem, index) => (
        <Box m={0.5} height={56} display="flex" alignItems="center" bgcolor="#262424">
          <Box p={2} width={192} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
            <Name name={killFeedItem.killer} />
          </Box>
          <Box p={2} style={{ transform: 'scaleX(-1)' }}>
            {weapon_mapping[killFeedItem.weapon]}
          </Box>
          <Box p={2} white-space="nowrap" overflow="hidden" text-overflow="ellipsis">
            <Name name={killFeedItem.target} />
          </Box>
        </Box>
      ))}
    </TableContainer>
  );
};

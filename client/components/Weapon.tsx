import { Crowbar } from './weapons/Crowbar';
import { Pistol } from './weapons/Pistol';
import { ColtPython357Magnum } from './weapons/ColtPython357Magnum';
import { MP5 } from './weapons/MP5';
import { AssaultShotgun } from './weapons/AssaultShotgun';
import { Crossbow } from './weapons/Crossbow';
import { RPG } from './weapons/RPG';
import { Hornet } from './weapons/Hornet';
import { Grenade } from './weapons/Grenade';
import { GlounGun } from './weapons/GlounGun';
import { TauCanon } from './weapons/TauCanon';
import { Death } from './weapons/Death';
import { Snark } from './weapons/Snark';
import { Stachel } from './weapons/Stachel';
import { Tripmine } from './weapons/Tripmine';
import React from 'react';

const weaponMapping: Record<string, JSX.Element> = {
  crowbar: <Crowbar />,
  '9mmhandgun': <Pistol />,
  '357': <ColtPython357Magnum />,
  '9mmAR': <MP5 />,
  shotgun: <AssaultShotgun />,
  crossbow: <Crossbow />,
  bolt: <Crossbow />,
  rpg_rocket: <RPG />,
  hornet: <Hornet />,
  grenade: <Grenade />,
  'gluon gun': <GlounGun />,
  tau_cannon: <TauCanon />,
  world: <Death />,
  tank: <Death />,

  snark: <Snark />,
  satchel: <Stachel />,
  tripmine: <Tripmine />,
};

export const Weapon = ({ weaponName }: { weaponName: string }): JSX.Element => {
  if (!weaponName || weaponName === 'null') {
    return <Death />;
  }

  return weaponMapping[weaponName];
};

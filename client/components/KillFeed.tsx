import { KillFeedItem } from '../types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IKillFeedItem } from '../../shared/types';

interface Props {
  killFeedItems: IKillFeedItem[];
}

export const KillFeed = ({ killFeedItems }: Props): JSX.Element => (
  <TableContainer component={Paper}>
    <Table size="small">
      <TableBody>
        {killFeedItems.map((killFeedItem, index) => (
          <TableRow style={index % 2 ? { background: 'black' } : { background: 'grey' }}>
            <TableCell>{killFeedItem.timestamp}</TableCell>
            <TableCell>{killFeedItem.killer}</TableCell>
            <TableCell>
              <img
                className="weapon_icons"
                height="32px"
                src={
                  'assets/weapons/' +
                  killFeedItem.weapon.replace(new RegExp(' ', 'g'), '_') +
                  '.svg'
                }
              />
            </TableCell>
            <TableCell>{killFeedItem.target}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

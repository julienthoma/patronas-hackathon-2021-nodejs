import { KillFeedItem } from "../types";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface Props {
  feedItems: KillFeedItem[];
}

export const KillFeed = ({ feedItems }: Props): JSX.Element => (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Killer</TableCell>
            <TableCell>Weapon</TableCell>
            <TableCell>Target</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedItems.map((row) => (
            <TableRow>
              <TableCell>{row.killerName}</TableCell>
              <TableCell>{row.weapon}</TableCell>
              <TableCell>{row.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
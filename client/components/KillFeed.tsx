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
        <TableBody>
          {feedItems.map((row, index) => (
            <TableRow style = { index % 2? { background : "black" }:{ background : "grey" }}>
              <TableCell>{row.killerName}</TableCell>
              <TableCell><img height="32px" src={"assets/weapons/"+row.weapon+".svg"}></img></TableCell>
              <TableCell>{row.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
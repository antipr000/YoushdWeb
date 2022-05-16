import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_URL } from '../utils';

export default function TransactionsTable({ transactions }) {
    
    async function deleteTransaction (transactionId){
        await axios.delete(`${BASE_URL}/transaction/${transactionId}`);
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>UserID</TableCell>
            <TableCell align="right">TransactionID</TableCell>
            <TableCell align="right">Parent TransactionID</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Referral URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.user_id}
              </TableCell>
              <TableCell align="right">{row.transaction_id}</TableCell>
              <TableCell align="right">{row.parent_transaction_id}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.referralUrl}</TableCell>
              <TableCell align='right'>
                  <IconButton onClick={() => {
                      deleteTransaction(row.transaction_id)
                  }}>
                      <DeleteIcon></DeleteIcon>
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

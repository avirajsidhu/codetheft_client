/**
 *
 * History
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {requestGetAxios} from '../../utils/request';
import moment from "moment";
import {BASE_URL} from '../../utils/helpers' 

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: "50px"
  },
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export function History() {
  const [questions, setData] = React.useState([]);
  (async function  getData (){
      const response = await requestGetAxios(`${BASE_URL}/questions`);
      if(response.status === 200){
        setData(response.data.data);
      }
    })();
    const classes = useStyles();
    return(<Grid container direction="column" alignItems="center">
      <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Question Code</TableCell>
            <TableCell align="right">Input</TableCell>
            <TableCell align="right">Output</TableCell>
            <TableCell align="right">Browser</TableCell>
            <TableCell align="right">IP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions &&  questions.length && questions.map(row => (
            <TableRow key={row._id}>
              <TableCell align="center">{moment(row.timestamp).format("YYYY/MM/DD HH:mm A")}</TableCell>
              <TableCell align="center">
                {row.questionCode}
              </TableCell>
              <TableCell align="right">{row.input}</TableCell>
              <TableCell align="right">{row.output}</TableCell>
              <TableCell align="right">{row.browser}</TableCell>
              <TableCell align="right">{row.ip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
      {/*this.state.questions.map(() => {
        return(<Grid item xs={12}>

          </Grid>);
      })*/}
    </Grid>);
  // }
}

History.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(History);

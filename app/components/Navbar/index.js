
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 100
  },
  description: {
    margin: 15
  },
  button: {
    margin: 5
  }
}))

function Navbar() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Welcome to CodeTheft.
      </Typography>
      <Typography variant="h5" className={classes.description}>
        A simple toolkit which takes in input cases and produces result according to the question's requirements. 
      </Typography>
      <Button 
        component={Link}
        to="/"
        variant="outlined" 
        color="primary" 
        className={classes.button}
      >
        Questions
      </Button>
      <Button 
        component={Link}
        to="/history"
        variant="outlined" 
        color="primary" 
        className={classes.button}
      >
        History
      </Button>
    </div>
  );
}

export default Navbar;

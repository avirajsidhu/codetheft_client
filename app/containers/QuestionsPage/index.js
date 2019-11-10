/**
 *
 * QuestionsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { 
  makeSelectInputData1, 
  makeSelectInputData2, 
  makeSelectInputData3, 
  makeSelectInputData4 
} from './selectors';
import { setInputData, getResult } from './actions';
import reducer from './reducer';
import saga from './saga';

const options = ['Compress', 'Decompress',];

const data = [
  {
    "questionNumber": 1,
    "questionTitle": "Extract number from input string."
  },
  {
    "questionNumber": 2,
    "questionTitle": "Merge two sorted arrays. Enter the elements of array1 and array2 separated by ';' Ex. (a,b,c,d;e,f,g,h) "
  },
  {
    "questionNumber": 3,
    "questionTitle": "Compress or decompress the string."
  },
  {
    "questionNumber": 4,
    "questionTitle": "Check balance of braces in string."
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 17
  },
  questionSet: {
    margin: 50,
    fontSize: 17
  },
  question: {
    marginLeft: 10,
    fontSize: 17
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(10),
    width: 250,
  },
  interaction: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  button: {
    height: 35
  }
}))



export function QuestionsPage({
  onChangeInputField,
  onEvaluateClick,
  handleClick
}) {
  useInjectReducer({ key: 'questionsPage', reducer });
  useInjectSaga({ key: 'questionsPage', saga });

  const classes = useStyles();

  function SplitButton() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };
  
    const handleToggle = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
    const handleClose = event => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <Grid container direction="column" alignItems="center" style={{width: "auto"}}>
        <Grid item xs={12}>
          <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button" >
            <Button onClick={() => handleClick(selectedIndex)}>{options[selectedIndex]}</Button>
            <Button
              color="primary"
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={event => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      {
        data.map(element => (
          <div key={element.questionNumber} className={classes.questionSet}>
            <Typography variant="h6" className={classes.questionNumber}>
              Question {element.questionNumber}
            </Typography>
            <Typography variant="h5" className={classes.question}>
              {element.questionTitle}
            </Typography>
            <div className={classes.interaction}>
              <TextField
                id="standard-basic"
                className={classes.textField}
                label="Input"
                margin="normal"
                onChange={(evt) => onChangeInputField(element.questionNumber, evt.target.value)}
              />
              {
                (element.questionNumber !== 3) ?
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick={() => onEvaluateClick(element.questionNumber)}
                  >
                    Evaluate
                  </Button>
                : SplitButton()
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

QuestionsPage.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeInputField: (questionNumber, value) => dispatch(setInputData(questionNumber, value)),
    onEvaluateClick: (questionNumber) => dispatch(getResult(questionNumber)),
    handleClick: (selectedIndex) => {
      (selectedIndex == 0)? dispatch(getResult('3c')) : dispatch(getResult('3d'))
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QuestionsPage);

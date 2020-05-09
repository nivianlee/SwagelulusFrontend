import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as Api from '../api/api';

const useStyles = makeStyles({});

export default function FormDialog(props) {
  const classes = useStyles();
  const [nric, setNric] = useState('');

  const onTextFieldChange = (e) => {
    setNric(e.target.value);
  };

  const handleLogin = () => {
    props.handleLogin(nric);
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} square aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        <Typography variant='h4'>Log In</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Authenticate with SingPass</DialogContentText>
        <TextField
          autoFocus
          variant='filled'
          margin='dense'
          id='name'
          label='NRIC'
          type='nric'
          onChange={onTextFieldChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleLogin} color='primary'>
          Authenticate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

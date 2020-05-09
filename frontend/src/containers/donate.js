import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridOrg from '../components/ItemCardGridOrg';
import * as Api from '../api/api';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({}));

const Donate = (props) => {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [hasDonated, setHasDonated] = useState(false);

  const onDonationAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const donate = () => {
    const body = { orgID: props.selectedOrganisationID, amount: amount };
    Api.updateDonatedAmount(body)
      .then((result) => {
        setHasDonated(true);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid container className={classes.center} direction='column'>
      {hasDonated ? (
        <Grid item>
          <Typography>Thank you for your donation!</Typography>
        </Grid>
      ) : (
        <React.Fragment>
          <Grid item>
            <TextField
              autoFocus
              variant='outlined'
              label='SGD'
              margin='dense'
              id='amount'
              onChange={onDonationAmountChange}
            />
          </Grid>
          <Grid item>
            <Button onClick={donate} color='primary' variant='contained'>
              Donate
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedOrganisationID: state.reducer.selectedOrganisationID,
  organisations: state.reducer.organisations,
});
export default connect(mapStateToProps)(Donate);

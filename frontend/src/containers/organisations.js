import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridOrg from '../components/ItemCardGridOrg';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({}));

const Organisations = (props) => {
  const classes = useStyles();

  useEffect(() => {
    Api.getAllOrganisations()
      .then((result) => {
        props.dispatch({ type: 'SET_ORGANISATIONS', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectOrg = (orgID) => {
    props.dispatch({ type: 'SET_SELECTED_ORGANISATION_ID', data: orgID });
    props.history.push('/donate');
  };

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Card>
          <ItemCardGridOrg dataList={props.organisations} buttonText={'Donate'} buttonOnClick={selectOrg} />
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  organisations: state.reducer.organisations,
});
export default connect(mapStateToProps)(Organisations);

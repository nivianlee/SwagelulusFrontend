import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridOrg from '../components/ItemCardGridOrg';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  center: { justifyContent: 'center' },
}));

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

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Card>
          <CardContent>hello</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ItemCardGridOrg dataList={props.organisations} buttonText={'VIEW'} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  organisations: state.reducer.organisations,
});
export default connect(mapStateToProps)(Organisations);

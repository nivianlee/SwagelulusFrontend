import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({}));

const Profile = (props) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>Profile</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Profile);

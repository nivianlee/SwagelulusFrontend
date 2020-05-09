import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridRes from '../components/ItemCardGridRes';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  center: { alignItems: 'center', justifyContent: 'center' },
}));

const Businesses = (props) => {
  const classes = useStyles();

  useEffect(() => {
    Api.getAllRestaurants()
      .then((result) => {
        props.dispatch({ type: 'SET_RESTAURANTS', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectRestaurant = (restaurantID) => {
    props.dispatch({ type: 'SET_SELECTED_RESTAURANT_ID', data: restaurantID });
    props.history.push('/menu');
  };

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ItemCardGridRes dataList={props.restaurants} buttonText={'VIEW MENU'} buttonOnClick={selectRestaurant} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  restaurants: state.reducer.restaurants,
});
export default connect(mapStateToProps)(Businesses);

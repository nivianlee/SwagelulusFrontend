import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Background from '../images/sample_food_pasta.png';
import ItemCardGridFood from '../components/ItemCardGridFood';
import ItemCardGridOrg from '../components/ItemCardGridOrg';
import ItemCardGridRes from '../components/ItemCardGridRes';
import * as Api from '../api/api';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 70,
    paddingTop: '56.25%', // 16:9
  },
  center: { alignItems: 'center', justifyContent: 'center' },
}));

const Home = (props) => {
  const classes = useStyles();

  useEffect(() => {
    const body = { resID: 'G9073236H' };
    Api.getItemsByRestaurantId(body)
      .then((result) => {
        props.dispatch({ type: 'SET_RESTAURANT_FOOD_ITEMS', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });

    Api.getAllOrganisations()
      .then((result) => {
        props.dispatch({ type: 'SET_ORGANISATIONS', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });

    Api.getAllRestaurants()
      .then((result) => {
        props.dispatch({ type: 'SET_RESTAURANTS', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <React.Fragment>
      <Grid container className={classes.center}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Card>
            <ItemCardGridRes dataList={props.restaurants} buttonText={'VIEW'} />
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.center}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Card>
            <ItemCardGridOrg dataList={props.organisations} buttonText={'VIEW'} />
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.center}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Card>
            <ItemCardGridFood
              dataList={props.restaurantFoodItems.concat(props.restaurantFoodItems)}
              buttonText={'VIEW'}
            />
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  restaurantFoodItems: state.reducer.restaurantFoodItems,
  organisations: state.reducer.organisations,
  restaurants: state.reducer.restaurants,
});
export default connect(mapStateToProps)(Home);

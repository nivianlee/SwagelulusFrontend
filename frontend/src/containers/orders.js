import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridFood from '../components/ItemCardGridFood';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  center: { alignItems: 'center', justifyContent: 'center' },
}));

const Orders = (props) => {
  const classes = useStyles();

  useEffect(() => {
    // const body = { resID: props.selectedRestaurantID };
    // Api.getItemsByRestaurantId(body)
    //   .then((result) => {
    //     props.dispatch({ type: 'SET_RESTAURANT_FOOD_ITEMS', data: result.data });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, []);

  

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        "DEATH"
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedRestaurantID: state.reducer.selectedRestaurantID,
  restaurantFoodItems: state.reducer.restaurantFoodItems,
});
export default connect(mapStateToProps)(Orders);

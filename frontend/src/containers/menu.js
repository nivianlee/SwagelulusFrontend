import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridFood from '../components/ItemCardGridFood';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  center: { alignItems: 'center', justifyContent: 'center' },
}));

const Menu = (props) => {
  const classes = useStyles();

  useEffect(() => {
    const body = { resID: props.selectedRestaurantID };
    Api.getItemsByRestaurantId(body)
      .then((result) => {
        props.dispatch({ type: 'SET_RESTAURANT_FOOD_ITEMS', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addToCart = (foodItemID, quantity) => {
    if (quantity > 0) {
      if (sessionStorage.getItem('cart')) {
        let itemIsExisting = false;
        let newCart = JSON.parse(sessionStorage.getItem('cart')).map((cartItem) => {
          if (cartItem.foodItemID === foodItemID) {
            cartItem.quantity = cartItem.quantity + quantity;
            itemIsExisting = true;
          }
          return cartItem;
        });
        if (!itemIsExisting) {
          newCart = newCart.concat({ foodItemID: foodItemID, quantity: quantity });
        }
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        console.log(newCart);
      } else {
        sessionStorage.setItem('cart', JSON.stringify([{ foodItemID: foodItemID, quantity: quantity }]));
        console.log(JSON.parse(sessionStorage.getItem('cart')));
      }
    }
  };

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        {sessionStorage.getItem('userType') && sessionStorage.getItem('userType') === 'hcw' ? (
          <ItemCardGridFood dataList={props.restaurantFoodItems} buttonText={'Add to Cart'} buttonOnClick={addToCart} />
        ) : (
          <ItemCardGridFood dataList={props.restaurantFoodItems} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedRestaurantID: state.reducer.selectedRestaurantID,
  restaurantFoodItems: state.reducer.restaurantFoodItems,
});
export default connect(mapStateToProps)(Menu);

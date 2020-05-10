import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridFood from '../components/ItemCardGridFood';
import * as Api from '../api/api';
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  center: { alignItems: 'center', justifyContent: 'center' },
}));

const Menu = (props) => {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);

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
        setNotification('Item has been added to cart!');
        showNotification();
      } else {
        sessionStorage.setItem('cart', JSON.stringify([{ foodItemID: foodItemID, quantity: quantity }]));
        console.log(JSON.parse(sessionStorage.getItem('cart')));
      }
    }
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
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
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <Snackbar place='bc' color='info' message={notification} open={bc} onClose={() => setBC(false)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedRestaurantID: state.reducer.selectedRestaurantID,
  restaurantFoodItems: state.reducer.restaurantFoodItems,
});
export default connect(mapStateToProps)(Menu);

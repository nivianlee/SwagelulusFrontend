import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridFood from '../components/ItemCardGridFood';
import Button from '@material-ui/core/Button';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  titleBar: { alignItems: 'center' },
}));

const Cart = (props) => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const sessionCart = sessionStorage.getItem('cart');
    if (sessionCart) {
      setCart(JSON.parse(sessionCart));
    }
  }, []);

  useEffect(() => {
    const getFoodItemData = async () => {
      const foodItemList = await Promise.all(
        cart.map(
          (cartItem) =>
            new Promise((resolve, reject) => {
              const body = { foodItemID: cartItem.foodItemID };
              Api.getItemById(body)
                .then((result) => {
                  resolve(result.data[0]);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            })
        )
      );
      setFoodItems(foodItemList);
    };
    getFoodItemData();
  }, [cart]);

  const updateCart = (foodItemID, quantity) => {
    let sessionCart = sessionStorage.getItem('cart');
    if (sessionCart) {
      sessionCart = JSON.parse(sessionCart);
      if (quantity > 0) {
        sessionCart = JSON.parse(sessionStorage.getItem('cart')).map((cartItem) => {
          if (cartItem.foodItemID === foodItemID) {
            cartItem.quantity = quantity;
          }
          return cartItem;
        });
      } else {
        sessionCart = sessionCart.filter((cartItem) => cartItem.foodItemID != foodItemID);
      }
      sessionStorage.setItem('cart', JSON.stringify(sessionCart));
    }
  };

  const handleCheckout = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <Grid className={classes.titleBar} container direction='row'>
            <Grid item>
              <CardContent>Shopping Cart</CardContent>
            </Grid>
            <Grid item>
              <Button onClick={handleCheckout} color='primary' variant='contained'>
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item>
        <ItemCardGridFood
          dataList={foodItems}
          quantities={cart.map((cartItem) => cartItem.quantity)}
          buttonText={'Update'}
          buttonOnClick={updateCart}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Cart);

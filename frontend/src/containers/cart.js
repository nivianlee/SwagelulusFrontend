import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridFood from '../components/ItemCardGridFood';
import Button from '@material-ui/core/Button';
import * as Api from '../api/api';
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  titleBar: { alignItems: 'center' },
}));

const Cart = (props) => {
  const classes = useStyles();
  const [cart, setCart] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [notification, setNotification] = useState('');
  const [bc, setBC] = useState(false);

  useEffect(() => {
    const sessionCart = sessionStorage.getItem('cart');
    if (sessionCart) {
      setCart(JSON.parse(sessionCart));
    }
  }, []);

  useEffect(() => {
    getFoodItemData();
  }, [cart]);

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
        sessionCart = sessionCart.filter((cartItem) => cartItem.foodItemID !== foodItemID);
      }
      sessionStorage.setItem('cart', JSON.stringify(sessionCart));
    }
  };

  const handleCheckout = () => {
    if (sessionStorage.getItem('userID') && cart) {
      const dt = new Date();
      const body = {
        orderedAt: `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')} ${dt
          .getHours()
          .toString()
          .padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt
          .getSeconds()
          .toString()
          .padStart(2, '0')}`,
        fooditems: cart,
        userID: sessionStorage.getItem('userID'),
      };
      Api.placeOrder(body)
        .then((result) => {
          console.log(result);
          sessionStorage.removeItem('cart');
          getFoodItemData();
          setNotification('Ordered succcessfully!');
          showNotification();
        })
        .catch((err) => {
          console.error(err);
        });
      props.history.push('./cart');
    }
  };

  const showNotification = () => {
    setBC(true);
    setTimeout(function () {
      setBC(false);
    }, 6000);
  };

  return (
    <Grid container direction='column' spacing={2} justify='left'>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <Grid className={classes.titleBar} container direction='row'>
            <Grid item>
              <CardContent>Shopping Cart</CardContent>
            </Grid>
            {!cart.length ? (
              ''
            ) : (
              <Grid item>
                <Button onClick={handleCheckout} color='primary' variant='contained'>
                  Checkout
                </Button>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <ItemCardGridFood
          dataList={foodItems}
          quantities={cart.map((cartItem) => cartItem.quantity)}
          buttonText={'Update'}
          buttonOnClick={updateCart}
        />
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

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Cart);

import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ItemCardGridFood from '../components/ItemCardGridFood';
import * as Api from '../api/api';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../images/background.jpg';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
  },
  media: {
    height: 50,
    paddingTop: '30%', // 16:9
  },
  overlay: {
    position: 'absolute',
    top: '35%',
    left: '20%',
    color: '#fff',
    fontSize: '50px',
    fontFamily: 'Roboto',
    fontWeight: '900',
  },
  overlay2: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    color: '#fff',
    fontSize: '36px',
    fontFamily: 'Roboto',
    fontWeight: '900',
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
  }, []);

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={Background} title='title' />
          {window.screen.width > 1000 && (
            <>
              <div className={classes.overlay}>Help the Locals, Help the Workers</div>
              <div className={classes.overlay2}>Pay it forward!</div>
            </>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Home);

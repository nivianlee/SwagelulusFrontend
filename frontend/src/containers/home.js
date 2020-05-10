import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import * as Api from '../api/api';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Background from '../images/background.png';
import Features from '../images/features.jpg';
import Statistics from '../images/statistics.jpg';
import Gestures from '../images/gestures.png';
import Food from '../images/food.png';
import Help from '../images/help.png';
import Line from '../images/line.jpg';
import Chef from '../images/chef.png';
import Meal from '../images/meal.png';
import Chart from '../images/chart.png';
import Heroes from '../images/heroes.png';
import Two from '../images/two.png';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
  },
  card2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    height: '100%',
    width: '100%',
    paddingTop: '30%', // 16:9
  },
  media2: {
    height: '50%',
    width: '50%',
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center2: {
    marginTop: '50px',
    marginBottom: '50px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '20px',
    marginBottom: '20px',
    color: '#4ea5d5',
    fontSize: '36px',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: '20px',
    marginBottom: '50px',
    color: '#000',
    fontSize: '24px',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
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
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card className={classes.card}>
          <div className={classes.title}>Show your support today</div>
          <div className={classes.subtitle}>Give a meal to a hero today through our local F&Bs!</div>
          <Grid container direction='row'>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Gestures} width='150px' height='150px' alt='donate' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h6' style={{ marginTop: '20px' }}>
                    Donate
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    Explore over 800 meals to choose from local F&B's
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Food} width='150px' height='150px' alt='support' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h6' style={{ marginTop: '20px' }}>
                    Local F&B Supported
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    Increased orders to help tide them through this down period
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Heroes} width='150px' height='150px' alt='heroes' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h6' style={{ marginTop: '20px' }}>
                    Heroes Appreciated
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    We will notify you which hero has been appreciated!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row' className={classes.center2}>
            <img src={Line} width='90%' height='90%' alt='line' />
          </Grid>
          <Grid container direction='row'>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Chef} width='150px' height='150px' alt='chef' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h4' style={{ marginTop: '20px' }}>
                    350
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    Registered F&Bs supported
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Meal} width='150px' height='150px' alt='meal' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h4' style={{ marginTop: '20px' }}>
                    136k
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    Meals donated
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Two} width='150px' height='150px' alt='two' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h4' style={{ marginTop: '20px' }}>
                    34k
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    Heroes appreciated
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Grid container direction='column' className={classes.center}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <img src={Chart} width='150px' height='150px' alt='chart' />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h4' style={{ marginTop: '20px' }}>
                    $832k
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='body1' style={{ marginTop: '20px' }}>
                    Raised for a good cause
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row' className={classes.center2} />
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Home);

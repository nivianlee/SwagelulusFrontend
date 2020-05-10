import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridRes from '../components/ItemCardGridRes';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  center: { justifyContent: 'center', alignItems: 'center' },
}));

const Businesses = (props) => {
  const classes = useStyles();
  const [res, setRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    Api.getAllRestaurants()
      .then((result) => {
        props.dispatch({ type: 'SET_RESTAURANTS', data: result.data });
        setRes(result.data);
        setFiltered(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    let newList = [];
    if (e.target.value) {
      newList = res.filter((o) => {
        const lc = o.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = [...res];
    }
    setFiltered(newList);
  };

  const selectRestaurant = (restaurantID) => {
    props.dispatch({ type: 'SET_SELECTED_RESTAURANT_ID', data: restaurantID });
    props.history.push('/menu');
  };

  return (
    <Grid container className={classes.center} direction='column'>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <TextField
              id='filled-search'
              label='Search Name'
              type='search'
              value={searchQuery}
              onChange={handleChange}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} style={{ marginTop: '10px' }}>
        <ItemCardGridRes dataList={filtered} buttonText={'Donate'} buttonOnClick={selectRestaurant} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  restaurants: state.reducer.restaurants,
});
export default connect(mapStateToProps)(Businesses);

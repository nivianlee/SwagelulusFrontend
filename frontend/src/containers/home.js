import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Background from '../images/sample_food_pasta.png';
import ItemCardGridFood from '../components/ItemCardGridFood';
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

  return <React.Fragment></React.Fragment>;
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Home);

import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridOrder from '../components/ItemCardGridOrder';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  center: { alignItems: 'center', justifyContent: 'center' },
}));

const Orders = (props) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {}, []);

  return (
    <Grid container className={classes.center}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ItemCardGridOrder dataList={orders} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Orders);

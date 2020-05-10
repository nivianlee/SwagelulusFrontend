import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ItemCardGridOrder from '../components/ItemCardGridOrder';
import { BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as Api from '../api/api';

const useStyles = makeStyles((theme) => ({
  card: {
    justifyContent: 'center',
    alignItem: 'center',
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [ordersPerMonth, setOrdersPerMonth] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('userType') === 'hcw') {
      getOrgOrdersPerMonth();
    } else {
      getResOrdersPerMonth();
      getOrdersByRestaurantId();
    }
  }, []);

  const getOrdersByRestaurantId = async () => {
    const body = { resID: sessionStorage.getItem('userID') };
    Api.getOrdersByRestaurantId(body)
      .then(async (orders) => {
        const listOfListOfOrderItems = await Promise.all(
          orders.data.map(
            (order) =>
              new Promise((resolve, reject) => {
                Api.getOrderItemsByOrderId({ orderID: order.orderID })
                  .then((orderItems) => {
                    console.log(orderItems);
                    Api.getOrganisationById({ orgID: order.orgID })
                      .then((org) => {
                        resolve({ ...order, orderItems: orderItems.data, org: org.data });
                      })
                      .catch((err) => {
                        console.error(err);
                        reject(err);
                      });
                  })
                  .catch((err) => {
                    console.error(err);
                    reject(err);
                  });
              })
          )
        );
        console.log(listOfListOfOrderItems);
        setOrders(listOfListOfOrderItems);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getResOrdersPerMonth = async () => {
    Api.getResOrdersPerMonth()
      .then((result) => {
        let datas = result.data;
        datas.forEach(function (data, index) {
          if (sessionStorage.getItem('userID') === data.resID) {
            let data1 = {
              month: data.year + '-' + data.month,
              numberOfOrders: data.total.toFixed(2),
            };
            setOrdersPerMonth((ordersPerMonth) => [...ordersPerMonth, data1]);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getOrgOrdersPerMonth = async () => {
    Api.getOrgOrdersPerMonth()
      .then((result) => {
        let datas = result.data;
        datas.forEach(function (data, index) {
          if (parseInt(sessionStorage.getItem('orgID')) === data.orgID) {
            let data1 = {
              month: data.year + '-' + data.month,
              numberOfOrders: data.total.toFixed(2),
            };
            setOrdersPerMonth((ordersPerMonth) => [...ordersPerMonth, data1]);
          }
        });
        props.dispatch({ type: 'SET_ORG_ORDERS_PER_MONTH', data: result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid container>
      <Grid container direction='row' className={classes.card} spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardContent align='center'>
              <>
                <Typography variant='overline' display='block' component='p' align='center'>
                  Number of Orders Per Month
                </Typography>
                <LineChart
                  width={500}
                  height={280}
                  data={ordersPerMonth}
                  margin={{
                    top: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis domain={sessionStorage.getItem('userType') === 'hcw' ? [20, 400] : [30, 300]} />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='numberOfOrders' stroke='#8884d8' activeDot={{ r: 8 }} />
                </LineChart>
              </>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.center}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <ItemCardGridOrder dataList={orders} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  orgOrdersPerMonth: state.reducer.orgOrdersPerMonth,
});
export default connect(mapStateToProps)(Profile);

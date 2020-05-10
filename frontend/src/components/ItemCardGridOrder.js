import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridOrder(props) {
  return (
    <Grid container direction='row' justify='center' spacing={2}>
      {props.dataList.map((order, index) => (
        <Grid item sm={3} md={3} lg={3} key={index}>
          <ItemCard
            title={order.org.name}
            image={order.org.image}
            subtitle={`${order.org.address} ${order.org.postalCode}`}
            descIsList={true}
            description={order.orderItems.map((orderItem) => `${orderItem.quantity}x ${orderItem.name}`)}
            buttonText={props.buttonText}
            buttonOnClick={(quantity) => props.buttonOnClick()}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

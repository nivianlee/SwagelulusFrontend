import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridRes(props) {
  return (
    <Grid container direction='row' justify={'center'} spacing={2}>
      {props.dataList.map((restaurant, index) => (
        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
          <ItemCard
            title={restaurant.name}
            image={restaurant.image}
            subtitle={restaurant.contactNum}
            description={restaurant.address + ' ' + restaurant.postalCode}
            buttonText={props.buttonText}
            buttonOnClick={() => props.buttonOnClick(restaurant.resID)}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

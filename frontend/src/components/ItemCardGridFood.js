import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridFood(props) {
  return (
    <Grid container direction='row' justify='center' spacing={2}>
      {props.dataList.map((foodItem, index) => (
        <Grid item sm={3} md={3} lg={3} key={index}>
          <ItemCard
            title={foodItem.name}
            image={foodItem.image}
            subtitle={'$' + foodItem.price}
            description={foodItem.description}
            buttonText={props.buttonText}
            buttonOnClick={(quantity) => props.buttonOnClick(foodItem.foodItemID, quantity)}
            allowQuantity={true}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

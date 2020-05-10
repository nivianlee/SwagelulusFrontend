import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridFood(props) {
  return (
    <Grid container direction='row' justify='center' spacing={2}>
      {props.dataList.map((foodItem, index) => (
        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
          <ItemCard
            title={foodItem.name}
            image={foodItem.image}
            subtitle={'$' + foodItem.price}
            description={foodItem.description}
            buttonText={props.buttonText}
            buttonOnClick={(quantity) => props.buttonOnClick(foodItem.foodItemID, quantity)}
            allowQuantity={true}
            quantity={props.quantities && props.quantities[index]}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

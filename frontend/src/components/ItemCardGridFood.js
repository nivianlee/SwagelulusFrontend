import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridFood(props) {
  return (
    <Grid container direction='row' justify='center' spacing={2}>
      {props.dataList.map((foodItem, index) => (
        <Grid item key={index}>
          <ItemCard
            title={foodItem.name}
            image={foodItem.image}
            subtitle={'$' + foodItem.price}
            description={foodItem.description}
            buttonText={props.buttonText}
            buttonOnClick={() => console.log(foodItem.image)}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}
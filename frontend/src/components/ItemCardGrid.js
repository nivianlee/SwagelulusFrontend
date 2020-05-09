import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGrid(props) {
  return (
    <Grid container direction='row' spacing={2}>
      {props.dataList.map((foodItem, index) => (
        <Grid item key={index}>
          <ItemCard
            title={foodItem.name}
            subtitle={'$' + foodItem.price}
            description={foodItem.description}
            buttonText={props.buttonText}
            buttonOnClick={() => console.log('test')}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

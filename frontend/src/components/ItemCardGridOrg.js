import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridOrg(props) {
  return (
    <Grid container direction='row' justify={'center'} spacing={2}>
      {props.dataList.map((org, index) => (
        <Grid item key={index}>
          <ItemCard
            title={org.name}
            subtitle={'# meals donated today'}
            description={org.address + ' ' + org.postalCode}
            buttonText={props.buttonText}
            buttonOnClick={() => console.log('test')}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

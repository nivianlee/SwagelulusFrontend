import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridOrg(props) {
  return (
    <Grid container direction='row' justify={'center'} spacing={2}>
      {props.dataList.map((org, index) => (
        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
          <ItemCard
            title={org.name}
            image={org.image}
            description={org.address + ' ' + org.postalCode}
            buttonText={props.buttonText}
            buttonOnClick={() => props.buttonOnClick(org.orgID)}
            allowHover={true}
          />
        </Grid>
      ))}
    </Grid>
  );
}

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

export default function ItemCardGridOrg(props) {
  return (
    <Grid container direction='row' spacing={2}>
      {props.dataList.map((org, index) => (
        <Grid item sm={3} md={3} lg={3} key={index}>
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

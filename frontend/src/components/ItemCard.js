import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import sample_image from '../images/sample_food_pasta.png';

const useStyles = makeStyles({
  root: {
    width: 300,
    borderRadius: 8,
    paddingBottom: 10,
  },
  media: {
    height: 70,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    justifyContent: 'center',
  },
});

export default function ItemCard(props) {
  const classes = useStyles();
  const [raised, setRaised] = useState(false);

  const handleHover = () => {
    if (props.allowHover) {
      setRaised(!raised);
    }
  };

  return (
    <Card className={classes.root} raised={raised} onMouseOver={handleHover} onMouseOut={handleHover}>
      <CardMedia className={classes.media} image={sample_image} title='Paella dish' />
      <CardContent>
        <Typography variant='h6' component='h2'>
          {props.title}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {props.subtitle}
        </Typography>
        <Typography variant='body2' component='p'>
          {props.description}
        </Typography>
      </CardContent>
      {props.buttonText && (
        <CardActions>
          <Grid className={classes.button} container>
            <Grid item>
              <Button variant='contained' size='small' color='primary' onClick={props.buttonOnClick}>
                {props.buttonText}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
}

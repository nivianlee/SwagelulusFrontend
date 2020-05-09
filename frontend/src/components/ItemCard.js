import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: 300,
    minHeight: 450,
    borderRadius: 8,
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
    alignItems: 'center',
  },
});

export default function ItemCard(props) {
  const classes = useStyles();
  const [raised, setRaised] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (props.quantity) {
      setQuantity(props.quantity);
    }
  }, []);

  const handleHover = () => {
    if (props.allowHover) {
      setRaised(!raised);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <Card className={classes.root} raised={raised} onMouseOver={handleHover} onMouseOut={handleHover}>
      <CardMedia className={classes.media} image={props.image} title={props.title} />
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
          <Grid className={classes.button} container direction='row' spacing={1}>
            <Grid item>
              {props.allowQuantity && (
                <ButtonGroup size='small' aria-label='small outlined button group'>
                  <Button onClick={handleDecrement}>-</Button>
                  <Button style={{ backgroundColor: 'transparent' }}>{quantity}</Button>
                  <Button onClick={handleIncrement}>+</Button>
                </ButtonGroup>
              )}
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                style={{ backgroundColor: '#4ea5d5', color: '#ffffff' }}
                onClick={() => props.buttonOnClick(quantity)}
              >
                {props.buttonText}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
}

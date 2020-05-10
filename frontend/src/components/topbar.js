import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Logo from '../images/logo4.jpg';

const useStyles = makeStyles((theme) => ({
  appBar: { zIndex: theme.zIndex.drawer + 1 },
  menuButton: {
    color: '#000000',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  header: {
    marginTop: '8px',
  },
}));

const Topbar = (props) => {
  const classes = useStyles();
  const {
    handleDrawerToggle,
    handlePressLogin,
    handleLogout,
    handleLogo,
    handleProfile,
    handleShoppingCart,
    pathname,
    handleSelectedItem,
    selectedItem,
  } = props;

  return (
    <AppBar position='fixed' className={classes.appBar} style={{ backgroundColor: '#ffffff' }}>
      <Toolbar>
        <IconButton
          aria-label='open drawer'
          edge='start'
          onClick={() => handleDrawerToggle()}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Grid container style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <Grid
              container
              style={{ display: 'flex', direction: 'row', justifyContent: 'space-between', width: '600px' }}
            >
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Button color='primary' variant='text'>
                  <img
                    src={Logo}
                    width='175px'
                    height='60px'
                    alt='support'
                    onClick={() => {
                      handleLogo();
                    }}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button color='primary' variant='text'>
                  <Typography
                    variant='body1'
                    style={{ color: '#000000', marginTop: '20px', marginLeft: '24px' }}
                    onClick={(event) => handleSelectedItem(event, 1)}
                    selected={selectedItem === 1}
                  >
                    Our Beneficiaries
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button color='primary' variant='text'>
                  <Typography
                    variant='body1'
                    style={{ color: '#000000', marginTop: '20px' }}
                    onClick={(event) => handleSelectedItem(event, 2)}
                    selected={selectedItem === 2}
                  >
                    Partner Restaurants
                  </Typography>
                </Button>
              </Grid>
              {sessionStorage.getItem('userType') === 'res' && (
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Button color='primary' variant='text'>
                    <Typography
                      variant='body1'
                      style={{ color: '#000000', marginTop: '12px' }}
                      onClick={(event) => handleSelectedItem(event, 4)}
                      selected={selectedItem === 4}
                    >
                      Orders
                    </Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          {sessionStorage.getItem('userID') ? (
            <Grid item style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
              {sessionStorage.getItem('userType') && sessionStorage.getItem('userType') === 'hcw' && (
                <Tooltip title='My Cart'>
                  <IconButton
                    aria-label='shoppingCart'
                    onClick={() => {
                      handleShoppingCart();
                    }}
                  >
                    <ShoppingCartIcon style={{ color: '#000000' }} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title='My Profile'>
                <IconButton
                  aria-label='accountCircle'
                  onClick={() => {
                    handleProfile();
                  }}
                >
                  <AccountCircleIcon style={{ color: '#000000' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title='Logout'>
                <IconButton
                  edge='end'
                  aria-label='logout'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <ExitToAppIcon style={{ color: '#000000' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          ) : (
            <Grid item style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
              <Tooltip title='Login'>
                <IconButton
                  edge='end'
                  aria-label='vpnKey'
                  onClick={() => {
                    handlePressLogin();
                  }}
                >
                  <VpnKeyIcon style={{ color: '#000000' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Topbar;

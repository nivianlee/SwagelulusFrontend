import React, { useState, useEffect } from 'react';
import './App.css';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';

import Home from './containers/home';
import Organisations from './containers/organisations';
import Businesses from './containers/businesses';
import Profile from './containers/profile';
import Menu from './containers/menu';
import Donate from './containers/donate';
import Cart from './containers/cart';
import Orders from './containers/orders';

import Sidebar from './components/sidebar';
import Topbar from './components/topbar';

import * as Reducer from './reducers/reducers.js';
import * as Api from './api/api';
//for the appbar and drawer
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import LoginPopover from './components/LoginPopover';

const rootReducer = combineReducers({
  reducer: Reducer.reducer,
});

const store = createStore(rootReducer);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  let pathname = props.history.location.pathname;
  const [selectedItem, setSelectedItem] = useState(0);
  const [showingLogin, setShowingLogin] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    if (pathname === '/') {
      setSelectedItem(0);
    }
    if (pathname === '/organisations') {
      setSelectedItem(1);
    }
    if (pathname === '/businesses') {
      setSelectedItem(2);
    }
    if (pathname === '/profile') {
      setSelectedItem(3);
    }
    if (pathname === '/orders') {
      setSelectedItem(4);
    }
  }, [props.history.location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectedItem = (event, index) => {
    setSelectedItem(index);
    console.log(index);

    if (index === 0) {
      props.history.push('/');
    }
    if (index === 1) {
      props.history.push('/organisations');
    }
    if (index === 2) {
      props.history.push('/businesses');
    }
    if (index === 3) {
      props.history.push('/profile');
    }
    if (index === 4) {
      props.history.push('/orders');
    }
  };

  const openLoginDialog = () => {
    setShowingLogin(true);
  };

  const closeLoginDialog = () => {
    setShowingLogin(false);
  };

  const handleLogin = (nric) => {
    const body = { id: nric };
    Api.login(body)
      .then((result) => {
        if (result.data.isValid) {
          sessionStorage.setItem('userID', nric);
          sessionStorage.setItem('userType', result.data.type);
          if (result.data.type === 'hcw') {
            sessionStorage.setItem('orgID', result.data.id);
          }
          props.history.push('/');
        } else {
          console.log('invalid user id');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    props.history.push('/');
  };

  const handleLogo = () => {
    props.history.push('/');
  };

  const handleProfile = () => {
    props.history.push('/profile');
  };

  const handleShoppingCart = () => {
    props.history.push('/cart');
  };

  return (
    <Provider store={store}>
      <div className={classes.root}>
        {mobileOpen && (
          <nav className={classes.drawer} aria-label='mailbox folders'>
            <Sidebar
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
              handleSelectedItem={handleSelectedItem}
              selectedItem={selectedItem}
            />
          </nav>
        )}
        <Topbar
          handleDrawerToggle={handleDrawerToggle}
          handlePressLogin={openLoginDialog}
          handleLogout={handleLogout}
          handleLogo={handleLogo}
          handleProfile={handleProfile}
          handleShoppingCart={handleShoppingCart}
          pathname={pathname}
          handleSelectedItem={handleSelectedItem}
          selectedItem={selectedItem}
          mobileOpen={mobileOpen}
        />
        <LoginPopover open={showingLogin} handleLogin={handleLogin} handleClose={closeLoginDialog} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/home' component={Home}></Route>
            <Route exact path='/organisations' component={Organisations}></Route>
            <Route exact path='/businesses' component={Businesses}></Route>
            <Route exact path='/profile' component={Profile}></Route>
            <Route exact path='/menu' component={Menu}></Route>
            <Route exact path='/donate' component={Donate}></Route>
            <Route exact path='/cart' component={Cart}></Route>
            <Route exact path='/orders' component={Orders}></Route>
            <Redirect from='/' to={'home'} />
          </Switch>
        </main>
      </div>
    </Provider>
  );
};

export default withRouter(App);

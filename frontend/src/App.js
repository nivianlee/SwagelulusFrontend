import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import * as Reducer from './reducers/reducers.js';
//for the appbar and drawer
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const rootReducer = combineReducers({
  reducer: Reducer.reducer,
});

const store = createStore(rootReducer);

const App = (props) => {
  return (
    <Provider store={store}>
      <Grid container direction='column'>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardContent>Hello!</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Provider>
  );
};

export default withRouter(App);

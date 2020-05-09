import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardGridOrg from '../components/ItemCardGridOrg';
import * as Api from '../api/api';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  center: { justifyContent: 'center' },
}));

const Organisations = (props) => {
  const classes = useStyles();
  const [org, setOrg] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    Api.getAllOrganisations()
      .then((result) => {
        props.dispatch({ type: 'SET_ORGANISATIONS', data: result.data });
        setOrg(result.data);
        setFiltered(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    let newList = [];
    if (e.target.value) {
      newList = org.filter((o) => {
        const lc = o.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = [...org];
    }
    setFiltered(newList);
  };

  const selectOrg = (orgID) => {
    props.dispatch({ type: 'SET_SELECTED_ORGANISATION_ID', data: orgID });
    props.history.push('/donate');
  };

  return (
    <Grid container className={classes.center} spacing={2}>
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <Card>
          <CardContent>
            <TextField
              id='filled-search'
              label='Search field'
              type='search'
              value={searchQuery}
              onChange={handleChange}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ItemCardGridOrg dataList={filtered} buttonText={'Donate'} buttonOnClick={selectOrg} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  organisations: state.reducer.organisations,
});
export default connect(mapStateToProps)(Organisations);

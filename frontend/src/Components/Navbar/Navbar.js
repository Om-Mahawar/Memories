import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import decode from 'jwt-decode';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';

import memories from '../../images/memories.png';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    ///JWT
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/auth');
    setUser(null);
  };

  return (
    <AppBar position='static' color='inherit' className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography variant='h2' align='center' className={classes.heading}>
          Memories
        </Typography>
        <img
          src={memories}
          alt='memories'
          height='60'
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <div className={classes.user}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageurl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant='h6'>
                {user.result.name}
              </Typography>
            </div>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

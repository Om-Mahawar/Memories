import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(!user);
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route
            path='/auth'
            exact
            component={() => (!user ? <Auth /> : <Redirect to='/' />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

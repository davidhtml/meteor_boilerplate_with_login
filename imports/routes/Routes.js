import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import history from './history'
import SignUp from './../ui/SignUp';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const nonAuthPages = [ '/', '/signup'];
const authPages = ['/dashboard'];

const onEnterPublicPage = (Component) => {
  if (Meteor.userId()) {
    return <Redirect to="/dashboard" />
    return
  } else {
    return <Component />
  }
}

const onEnterPrivatePage = (Component) => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />
  } else {
    return <Component />
  }
}

const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isNonAuthPage = nonAuthPages.includes(pathname);
  const isAuthPage = authPages.includes(pathname);

  if (isAuthenticated && isNonAuthPage) {
    history.replace('/dashboard');
  } else if (!isAuthenticated && isAuthPage) {
    history.replace('/');
  }
}

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route exact path="/signup" render={() => onEnterPublicPage(SignUp)} />
      <Route exact path="/dashboard" render={() => onEnterPrivatePage(Dashboard)}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export { onAuthChange, routes };

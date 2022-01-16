import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
export default Routes;

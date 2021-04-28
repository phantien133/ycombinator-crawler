import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Best from '../Best';
import Preview from '../Preview';

const Routes = () => (
  <Switch>
    <Route path="/" component={Best} exact />
    <Route path="/page/:page" component={Best} exact />
    <Route path="/preview/:id" component={Preview} exact />
  </Switch>
);

export default Routes;

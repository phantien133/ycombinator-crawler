import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Best from '../Best';

const Routes = () => (
  <Switch>
    <Route path="/" component={Best} exact />
    <Route path="/page/:page" component={Best} exact />
    {/* <Route path="/search" component={Search} exact />  */}
  </Switch>
);

export default Routes;

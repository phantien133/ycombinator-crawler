import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Best from '../Best';

const Routes = () => (
  <>
    <Route path="" component={Best} exact />
    <Route path="/page/:page" component={Best} exact />
    {/* <Route path="/search" component={Search} exact />  */}
  </>
);

export default Routes;

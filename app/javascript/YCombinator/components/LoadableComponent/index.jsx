import React from 'react';
import Loadable from 'react-loadable';

import LoadingSpinner from '../common/LoadingSpinner';

const LoadingComponent = (props) => {
  const {
    error, retry, timeOut, pastDelay,
  } = props;
  let render = null;
  if (error) {
    render = (
      <div>
        Error!
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  } else if (timeOut) {
    render = (
      <div>
        Taking a long time...
        <button type="button" onClick={retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    render = <LoadingSpinner />;
  }
  return render;
};

const LoadableComponent = (getRoute) => Loadable({
  loader: getRoute,
  loading: LoadingComponent,
  delay: 300,
  timeout: 10000,
});

export default LoadableComponent;

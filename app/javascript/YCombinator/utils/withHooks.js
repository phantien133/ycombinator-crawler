import { createFactory } from 'react';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';

const withHooks = (hooksHandler) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);
  const WithHooks = (props) => {
    hooksHandler(props);
    return factory(props);
  };
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'WithHooks'))(WithHooks);
  }
  return WithHooks;
};

export default withHooks;

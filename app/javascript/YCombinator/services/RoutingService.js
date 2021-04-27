/* eslint-disable no-underscore-dangle */
import { createBrowserHistory } from 'history';

let _history;

const history = () => {
  if (!_history) _history = createBrowserHistory();
  return _history;
};

export default history();

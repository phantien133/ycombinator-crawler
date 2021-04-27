import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from 'react-helmet';

import { store, persistor } from './store';

import NoMatch from './components/NoMatch';
import { theme } from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import GlobalStyle from './styles/globalStyle';
import history from './services/RoutingService';
import LoadableComponent from './components/LoadableComponent';

const YCombinator = LoadableComponent(() => import('./components/Main'));

const YCombinatorHackerNews = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'en' }}
              encodeSpecialCharacters
              defaultTitle="YCombinator Hacker News"
              titleTemplate="YCombinator Hacker News"
              titleAttributes={{ itemprop: 'YCombinator', lang: 'en' }}
            />
            <Switch>
              <Route path="/" component={YCombinator} />
              <Route component={NoMatch} />
            </Switch>
            <GlobalStyle />
          </ErrorBoundary>
        </ThemeProvider>
      </Router>
    </PersistGate>
  </Provider>
);

export default YCombinatorHackerNews;

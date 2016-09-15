import { configureStore } from '../app/redux/store';
import { polyfill as promisePolyfill } from 'es6-promise';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from '../app/routes';
import React from 'react';
import ReactDOM from 'react-dom';

promisePolyfill();

const store = configureStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

match(
    { history, routes: getRoutes(store) },
    (err, redirectLocation, renderProps) => {
        ReactDOM.render(
            <Provider store={store}>
                <Router {...renderProps} />
            </Provider>,
            document.getElementById('root')
        );
    }
);

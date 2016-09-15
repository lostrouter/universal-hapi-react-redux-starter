import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import promiseMiddleware from './middleware/promise-middleware';

export function configureStore(history, initState) {
    const initialState = initState || {};
    const middleware = [
        promiseMiddleware,
        routerMiddleware(history)
    ];

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middleware))
    );

    return store;
}

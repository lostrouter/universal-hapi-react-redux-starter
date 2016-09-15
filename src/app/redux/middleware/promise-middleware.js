/**
 * Redux middleware for handling asynchronous actions with promises
 */

import { createAction } from 'redux-actions';
import actionPostfixes from '../action-postfixes';

export default function promiseMiddleware() {
    return (next) => (action) => {
        // eslint-disable-next-line no-unused-vars
        const { promise, type, payload, ...rest } = action;

        let result;

        // A lack of a promise property means this middleware doesn't handle this request type
        if (!promise) {
            // dispatch the action to the reducers to finish processing the request
            result = next(action);
        } else if (typeof promise.then === 'function') {
            if (typeof type !== 'string') {
                throw new TypeError('Expected type to be a string.');
            }

            const requestType = type + actionPostfixes.REQUEST;
            const successType = type + actionPostfixes.SUCCESS;
            const failureType = type + actionPostfixes.FAILURE;

            const errorAction = createAction(failureType);
            const requestAction = createAction(requestType);
            const successAction = (successActionResult) => {
                return {
                    payload: successActionResult,
                    type: successType,
                    // if there are props used for other middleware
                    ...rest
                };
            };

            next(requestAction());

            // On success or failure, dispatch the appropriate action types
            result = promise.then(
                (promiseResult) => next(successAction(promiseResult)),
                (error) => next(errorAction(error))
            );
        }

        return result;
    };
}

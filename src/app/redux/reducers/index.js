import actionPostfixes from '../action-postfixes';
import assign from 'lodash.assign';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import {
    FETCH_VIEW
} from '../actions';

const defaultEmptyState = {};

const generateOverwriteAlwaysReducer = function(ACTION, shard) {
    return {
        [ACTION]: (state, action) => {
            /**
             * The state value that stores the shard will always
             * be set to _something_ different than it's previous value
             * (either the new value sent down with the payload or an empty object)
             */
            const payload = (shard && action.payload) ? action.payload[shard] : action.payload;

            return payload || {};
        }
    };
};

const generateOverwriteIfNewerReducer = function (ACTION, shard) {
    return {
        [ACTION]: (state, action) => {
            /**
             * The state value that stores the shard will be set to _something_ different
             * than it's previous value if it exists in the payload, or it will return
             * the existing state
             */
            const payload = (shard && action.payload) ? action.payload[shard] : action.payload;

            return payload || state;
        }
    };
};

export const viewData = handleActions(
    {
        [FETCH_VIEW + actionPostfixes.REQUEST]: (state) => (
            assign({}, state, { isFetching: true })
        ),
        ...generateOverwriteAlwaysReducer(FETCH_VIEW + actionPostfixes.SUCCESS, 'viewData')
    },

    defaultEmptyState
);

export default combineReducers({
    routing,
    viewData
});

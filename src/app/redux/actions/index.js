import fetch from 'isomorphic-fetch';

/**
 * ACTION NAMES
 * format: app/{shard}/{action}
 */

export const FETCH_VIEW = 'app/view-data/fetch-view';

/**
 * ACTION CREATORS
 */

export function fetchView(apiConfig) {
    const { url, method, headers, body } = apiConfig;

    return {
        type: FETCH_VIEW,
        promise: fetch(url, {
            method,
            body,
            headers
        }).then(response => response.json())
    };
}

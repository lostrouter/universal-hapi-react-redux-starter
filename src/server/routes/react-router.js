import Boom from 'boom';
import React from 'react';
import ReactDOM from 'react-dom/server';
import getRoutes from '../../app/routes';
import { Provider } from 'react-redux';
import { configureStore } from '../../app/redux/store';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

if (global.__WEBPACK__IS_SERVER === true) {
    require('file?name=templates/[name].[ext]!../templates/layout.hbs');
}

const reactRoute = {
    method: 'GET',
    path: '/{p*}',
    config: {
        description: 'catch all route',
        handler(request, reply) {

            // using raw request url because hapi extends and alters the signature in request.url
            const memoryHistory = createMemoryHistory(request.raw.req.url);
            const store = configureStore(memoryHistory);
            const history = syncHistoryWithStore(memoryHistory, store);
            let result;

            match({ history, routes: getRoutes(store), location: request.raw.req.url }, (err, redirectLocation, renderProps) => {
                const state = store.getState();

                if (err) {
                    request.log(['error', 'router'], err.message);
                    result = reply(Boom.badImplementation(null, err));
                } else if (redirectLocation) {
                    result = reply
                        .redirect(redirectLocation.pathname + redirectLocation.search);
                } else if (renderProps) {
                    const content = ReactDOM.renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    );

                    result = reply.view('layout', {
                        content
                    });
                } else {
                    result = reply(Boom.notFound());
                }

                return result;
            });
        },
        state: {
            parse: true,
            failAction: 'ignore'
        },
        notes: 'react-router router',
        tags: ['react-router']
    }
};

export default reactRoute;

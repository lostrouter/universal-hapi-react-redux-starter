import App from '../containers/app';
if (typeof require.ensure !== 'function') {
    require('require-ensure-shim').shim(require);
}

export default (store) => {
    const rootRoute = {
        childRoutes: [
            {
                path: '/',
                component: App,
                indexRoute: {
                    getComponent(nextState, callback) {
                        require.ensure([], (require) => {
                            callback(null, require('../containers/home')); // eslint-disable-line
                        });
                    }
                },
                getChildRoutes(partialNextState, callback) {
                    require.ensure([], (require) => {
                        callback(null, [
                            require('./about'),
                            require('./not-found')
                        ]);
                    });
                }
            },
        ]
    };

    return rootRoute;
};

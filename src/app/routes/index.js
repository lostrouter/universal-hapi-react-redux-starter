require('require-ensure-shim').shim(require);

export default (store) => {
    const rootRoute = {
        childRoutes: [
            {
                path: '/',
                getComponent(nextState, callback) {
                    require.ensure([], (require) => {
                        callback(null, require('../containers/app'));
                    });
                },
                indexRoute: {
                    getComponents(nextState, callback) {
                        require.ensure([], (require) => {
                            callback(null, require('../containers/home'));
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

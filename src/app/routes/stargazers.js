if (typeof require.ensure !== 'function') {
    require('require-ensure-shim').shim(require);
}

const StargazerRoute = {
    path: 'stargazers',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('../containers/stargazers'));
        });
    }
};

export default StargazerRoute;

require('require-ensure-shim').shim(require);

const AboutRoute = {
    path: 'about',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('../containers/about'));
        });
    }
};

export default AboutRoute;

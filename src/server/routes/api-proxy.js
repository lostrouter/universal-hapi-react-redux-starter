import Boom from 'boom';
import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
polyfill();

const ApiProxyRoute = {
    path: '/api/{parm*}',
    method: '*',
    handler(request, reply) {
        const url = 'https://api.github.com/repos/lostrouter/universal-hapi-react-redux-starter/stargazers';

        fetch(url, {
            method: 'GET'
        }).then(response => {
            reply(response);
        }).catch(error => {
            reply(Boom.badImplementation(null, error));
        });
    }
};

export default ApiProxyRoute;

const routes = [
    // route for unresolved routes
    require('./react-router'),
    // route for static files
    require('./public'),
    // api proxy to avoid cors issues in the browser
    require('./api-proxy')
];

export default routes;

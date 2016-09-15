const publicRoute = {
    method: 'GET',
    path: '/public/{p*}',
    handler: {
        directory: {
            path: 'public'
        }
    },
    config: {
        state: {
            parse: false,
            failAction: 'ignore'
        },
        description: 'public directory for static files',
        tags: ['inert', 'static']
    }
};

export default publicRoute;

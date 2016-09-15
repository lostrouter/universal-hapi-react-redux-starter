import blipp from 'blipp';
import Handlebars from 'handlebars';
import Hapi from 'hapi';
import inert from 'inert';
import processMonitor from './plugins/process-monitor';
import routes from './routes';
import vision from 'vision';

const serverPlugins = [
    // Outputs route table at startup
    blipp,
    // Allows logs to be dumped to the console, file, or HTTP
    processMonitor,
    // Handles serving static files
    inert,
    // Handles loading views and templates
    vision
];


export default {
    create: (callback) => {
        const server = new Hapi.Server();

        server.connection({
            port: 3000
        });

        server.register(serverPlugins, function (err) {
            if (err) {
                callback(err);
            } else {
                server.views({
                    engines: { hbs: Handlebars },
                    path: __dirname + '/templates',
                    helpersPath: __dirname + '/templates/helpers'
                });

                // Load the server-side routing table
                server.route(routes);

                callback(null, server);
            }
        });
    }
};

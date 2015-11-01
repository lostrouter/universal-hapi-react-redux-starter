import Hapi from 'hapi';
import Boom from 'boom';
import Inert from 'inert';
import Good from 'good';
import GoodConsole from 'good-console';

const Server = new Hapi.Server();

Server.connection({ port: process.env.port || 3000 });

Server.register(
	{
		register: Good,
		options: {
			reporters: [{
				reporter: GoodConsole,
				events: { log: '*',
				response: '*' }
			}]
		}
	},
	(err) => {
		if (err) {
			throw err;
		}

		Server.route({
			method: 'GET',
			path: '/',
			handler: (req, reply) => {
				reply('hit');
			}
		});
		Server.start(() => {
			Server.log('info', 'Server running at: ' + Server.info.uri);
		});
	}
);

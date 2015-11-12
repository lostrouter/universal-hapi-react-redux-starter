import Hapi from 'hapi';
import Boom from 'boom';
import Inert from 'inert';
import Good from 'good';
import GoodConsole from 'good-console';
import App from '../app';
import React from 'react';
import ReactDOM from 'react-dom/server'

const Server = new Hapi.Server(),
	pageHead =
		'<!DOCTYPE html>' +
		'<html>' +
		'<head>' +
		'<title>bidchuck app</title>' +
		'<link href="style.css" rel="stylesheet" />' +
		'<meta content="text/html;charset=utf-8" http-equiv="Content-Type">' +
		'<meta content="utf-8" http-equiv="encoding">' +
		'</head>' +
		'<body>' +
		'<div id="mainContainer">',
	pageFoot =
		'</div>' +
		'<script src="/public/app.min.js"></script>' +
		'</body>'
		'</html>';



Server.connection({ port: process.env.port || 3000 });

Server.register(
	[
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
		Inert
	],
	(err) => {
		if (err) {
			throw err;
		}

		Server.route([
			{
				method: 'GET',
				path: '/public/{file*}',
				handler: {
					directory: {
						path: 'dist/public',
						listing: false,
						index: false
					}
				}
			},
			{
				method: 'GET',
				path: '/',
				handler: (req, reply) => {
					const body = pageHead +
						ReactDOM.renderToString(<App />) +
						pageFoot;
					reply(body);
				}
			}]
		);
		Server.start(() => {
			Server.log('info', 'Server running at: ' + Server.info.uri);
		});
	}
);

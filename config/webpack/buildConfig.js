var path = require('path'),
	webpack = require('webpack'),
	projectFolder = path.resolve(__dirname, '../../'),
	devClient = require('./dev.config.js')(webpack, path, projectFolder);
	// prodClient = require('./release.config.js')(webpack, path, projectFolder);

module.exports = {
	webpackConfig: {
		debug: devClient,
		// production: prodClient,
	},
	devServer: {
		// settings for webpack-dev-server
		proxy: {
			// put your custom proxy routes here, e.g.:
			// '/api/': 'http://localhost:8081'
		},
		headers: {
			// put your custom headers here, e.g.:
			// 'X-TEST': 1,
		},
	},
};

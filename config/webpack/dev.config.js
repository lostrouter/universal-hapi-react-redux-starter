module.exports = function(webpack, path, projectFolder) {
	return {
		name: 'client application',
		context: projectFolder,
		debug: true,
		devtool: 'inline-source-map',
		entry: path.join(projectFolder, 'src', 'app'),
		target: 'web',
		output: {
			path: path.join(projectFolder, 'dist', 'public'),
			filename: 'app.min.js',
			sourceMapFilename: 'debugging/[file].map'
		},
		resolve: {
			root: projectFolder,
			extensions: ['', '.js', '.jsx'],
			modulesDirectories: ['node_modules']
		},
		node: {
			fs: 'empty'
		},
		eslint: {
			configFile: '.eslintrc'
		},
		module: {
			preLoaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'eslint'
				},
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'eslint'
				},
			],
			loaders: [
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
				},
				{
					test: /\.json$/,
					loader: 'json',
				},
				{
					test: /\.scss$/,
					loader: 'style!css!sass?sourceMap',
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loaders: ['babel?stage=0&ignore=buffer'],
				},
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loaders: ['babel?stage=0&ignore=buffer'],
				},
				{
					test: /\.woff\d?(\?.+)?$/,
					loader: 'url?limit=10000&minetype=application/font-woff',
				},
				{
					test: /\.ttf(\?.+)?$/,
					loader: 'url?limit=10000&minetype=application/octet-stream',
				},
				{
					test: /\.eot(\?.+)?$/,
					loader: 'url?limit=10000',
				},
				{
					test: /\.svg(\?.+)?$/,
					loader: 'url?limit=10000&minetype=image/svg+xml',
				},
				{
					test: /\.png$/,
					loader: 'url?limit=10000&mimetype=image/png',
				},
				{
					test: /\.gif$/,
					loader: 'url?limit=10000&mimetype=image/gif'
				}
			]
		},
		plugins: [
			new webpack.PrefetchPlugin('react'),
			new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
		]
	};
};

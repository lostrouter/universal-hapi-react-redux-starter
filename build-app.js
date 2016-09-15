var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var projectFolder = path.resolve(__dirname, '../');
var minimist = require('minimist');

var passedInParams = minimist(process.argv.slice(2));

process.env.NODE_ENV = passedInParams.environment || 'production';

var browserPackPlugins = [
    new ExtractTextPlugin("app.css"),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: passedInParams.environment
        },
        'global.__WEBPACK__IS_CLIENT': true,
        'global.__WEBPACK__IS_SERVER': false
    })
];

if (process.env.NODE_ENV === 'production') {
    browserPackPlugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin()
    )
}


var browserPack = webpack({
    name: 'browser build',
    target: 'web',
    entry: './src/client/index.jsx',
    output: {
        path: './public',
        filename: 'app.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/public/'
    },
    resolve: {
        root: projectFolder,
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    eslint: {
        configFile: '.eslintrc'
    },
    stats: {
        children: false
    },
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],

        loaders: [
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.(woff|woff2)$/,
                loaders: ['url?limit=100000&name=content/[name].[ext]']
            },
            {
                test: /\.(eot|ttf)$/,
                loaders: ['file?name=content/[name].[ext]']
            },
            {
                test: /\.(png|svg)$/,
                loaders: ['url?limit=10000&name=content/[name].[ext]']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ],
        plugins: browserPackPlugins
    }
});

browserPack.run((err, stats) => {
    if (err) {
        throw err;
    }

    console.log(stats.toString({
        chunks: false,
        colors: true
    }));
});


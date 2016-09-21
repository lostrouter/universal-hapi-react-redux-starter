/* eslint-disable no-var */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var minimist = require('minimist');
var path = require('path');
var webpack = require('webpack');

var projectFolder = path.resolve(__dirname, '../');
var passedInParams = minimist(process.argv.slice(2));

process.env.NODE_ENV = passedInParams.environment || 'production';

var browserPackPlugins = [
    new ExtractTextPlugin('app.css'),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"${passedInParams.environment}"`,
        'global.__WEBPACK__IS_CLIENT': true,
        'global.__WEBPACK__IS_SERVER': false
    })
];

var serverPackPlugins = [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `"${passedInParams.environment}"`
        },
        'global.__WEBPACK__IS_CLIENT': false,
        'global.__WEBPACK__IS_SERVER': true
    })//,
    // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: true })
];

if (process.env.NODE_ENV === 'production') {
    browserPackPlugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin()
    );
}


var eslint = {
    configFile: '.eslintrc'
};
var stats = {
    children: false
};
var resolve = {
    root: projectFolder,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
};
var preloaders = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
    }
];

var browserPack = webpack({
    name: 'browser build',
    target: 'web',
    entry: './src/client/index.jsx',
    output: {
        path: './dist/public',
        filename: 'app.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/public/'
    },
    resolve: resolve,
    eslint: eslint,
    stats: stats,
    module: {
        preloaders,
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
    },
    plugins: browserPackPlugins
});

browserPack.run((err, wStats) => {
    if (err) {
        throw err;
    }

    console.log(wStats.toString({ // eslint-disable-line no-console
        chunks: false,
        colors: true
    }));
});


/**
 * required so babel doesn't try to transpile
 * node binaries
 */

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


var serverPack = webpack({
    name: 'server build',
    target: 'node',
    // devtool: 'sourcemap',
    entry: './src/server/index.js',
    output: {
        path: './dist',
        filename: 'server.js'
    },
    resolve: resolve,
    eslint: eslint,
    stats: stats,
    module: {
        preloaders: preloaders,
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
                    plugins: ['add-module-exports', 'transform-runtime']
                }
            }
        ]
    },
    externals: nodeModules,
    plugins: serverPackPlugins
});

serverPack.run((err, wStats) => {
    if (err) {
        throw err;
    }

    console.log(wStats.toString({ // eslint-disable-line no-console
        chunks: false,
        colors: true
    }));
});

/* eslint-enable no-var */

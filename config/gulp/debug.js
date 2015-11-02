import webpack from 'webpack';
import gutil from 'gulp-util';

// get build config
const buildConfig = require('../webpack/buildConfig');
// get webpack config
const wpConfig = buildConfig.webpackConfig.debug;

// export initilizer
export default (gulp) => {
	gulp.task('debug', function(callback) {
		// run webpack
		webpack(wpConfig, function(err, stats) {
			if (err) {
				throw new gutil.PluginError('webpack', err);
			}
			// only log when errors
			gutil.log('[webpack]: ', stats.toString({
				chunks: false,
				modules: false,
				colors: true,
			}));
			callback();
		});
	});
};

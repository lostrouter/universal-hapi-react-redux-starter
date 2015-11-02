import fs from 'fs';
import gulp from 'gulp';

// blacklist self and utils folder
const blacklist = ['index.js', 'utils'];
// get local files
const files = fs.readdirSync('./config/gulp').filter(f => !blacklist.includes(f));

// load custom tasks
files.forEach(function(file) {
    require('./' + file)(gulp);
});

gulp.task('default', ['debug']);
// gulp.task('deploy', ['build', 'assets']);
// gulp.task('watch', ['test'], () => {
//     gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'test/**/*.js'], () => {
//         gulp.run('test');
//     });
// });

// Gulp Tasks for autocompiling Sass
var gulp    = require('gulp'),
    sass    = require('gulp-sass');

// Compile Sass files into CSS
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

// Watch SCSS files
gulp.task('default',function() {
	// Generate CSS files
	gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
    // Watcg for changes
    gulp.watch('sass/**/*.scss',['styles']);
    console.log('event triggered')
});
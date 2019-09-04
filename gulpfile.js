var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    imageResize = require('gulp-image-resize'),
    parallel = require("concurrent-transform"),
    os = require("os"),
    cp = require('child_process');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-serve', function (done) {
	var child = cp.exec('jekyll serve --config=_config.yml');
    child.stdout.pipe(process.stdout);
	child.stderr.pipe(process.stderr);
	
	gulp.watch('_scss/**/*.scss').on('change', function() {
		gulp.task('styles')();
	})
	
	return child;
});

/**
 * Compile files from sass into both assets/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('styles', function() {
  return gulp.src('_scss/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'Firefox ESR', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1']}))
    .pipe(postcss([opacity]))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});

// To support opacity in IE 8
var opacity = function(css) {
  css.eachDecl(function(decl, i) {
    if (decl.prop === 'opacity') {
      decl.parent.insertAfter(i, {
        prop: '-ms-filter',
        value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
      });
    }
  });
};


/**
 * Automatically resize post feature images and turn them into thumbnails
 */
gulp.task("thumbnails", function () {
  return gulp.src("assets/images/hero/*.{jpg,png}")
    .pipe(imageResize({ width : 350 }))
    .pipe(gulp.dest("assets/images/thumbnail"));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series('thumbnails', 'styles', 'jekyll-serve'));

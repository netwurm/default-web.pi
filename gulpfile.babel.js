"use strict";

///////// Check Updates //////////////
/* npm install -g npm-check-updates */
//////////////////////////////////////
// 
// Plugins
import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import autoprefixer from 'autoprefixer'
import clean from 'gulp-clean-css'
import browserSync from 'browser-sync'
import weg from 'gulp-clean'
import php from 'gulp-connect-php'
import sourcemaps from 'gulp-sourcemaps'
import newer from 'gulp-newer'
import ignore from 'gulp-ignore'
import copy from 'gulp-copy'
import CleanCSS from 'clean-css'

// import htmlmin from 'gulp-htmlmin' https://github.com/jonschlinkert/gulp-htmlmin
// import inline from 'gulp-inline-source' 

import postcss from 'gulp-postcss'
import postcssImport from 'postcss-import'
import precss from 'precss'
import cssnano from 'cssnano'

// postcss-prettify https://www.npmjs.com/package/postcss-prettify // css besser lesbar machen 

import postpurgecss from '@fullhuman/postcss-purgecss'

// $ npm install --save-dev gulp-strip-debug
// import debugoff from 'gulp-strip-debug'


import replace from 'gulp-replace'
import debug from 'gulp-debug'
import path from 'path'
import util from 'util'
import rename from 'gulp-rename'

// Image 
import imagemin from 'gulp-imagemin'


var RASPBERRY = true;

/* nur wenn cwebp unterstützt wird 
//////////////////////////////////////
// import cwebp from 'gulp-cwebp'
///////////////////////////////////////
*/

// yarn add  gulp-cwebp --dev
import imageResize from 'gulp-images-resizer'


/*
https://www.npmjs.com/package/gulp-image-resize
apt-get install imagemagick 
apt-get install graphicsmagick

//////////////// PHP Ausführen? /////////////
//var exec = require('child_process').exec;
/////////////////////////////////////////////
*/


///////////////////// Windows Build Tools //////////////////////////
// npm install --global windows-build-tools@4.0.0
// npm install --global --production windows-build-tools --vs2015
////////////////////////////////////////////////////////////////////


/*


PI Install libwebp

apt-get install -y gcc make autoconf automake libtool libjpeg-devel libpng-devel
wget storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.0.3.tar.gz
tar -zxvf libwebp-0.5.0.tar.gz
cd libwebp-0.5.0
./configure
make
make install


Evtl. noch einen Symbolischen Link auf "cwebp"

ln -sf /usr/local/share/.config/yarn/global/node_modules/cwebp-bin/vendor/cwebp /home/web/www/html/default-web.pi/node_modules/gulp-cwebp/node_modules/cwebp-bin/vendor/cwebp 

oder

var RASPBERRY = true;



autoreconf -vfi

https://developers.google.com/speed/webp/docs/compiling
https://github.com/taviso/ctypes.sh/issues/18
http://www.awsxin.com/tu-xiang-you-hua-zhi-webp/

Rechte ? 
chmod a+x  /home/web/www/html/default-web.pi/node_modules/cwebp-bin/vendor/cwebp

Löschen ? 
rm -fR  /usr/local/share/.cache/yarn/v4/npm-imagemin-webp-5.1.0-ddb1307ad97aff97293c5a600e384e40c07f68a7/node_modules/imagemin-webp

yarn add  cwebp-bin --global 
yarn add  imagemin-webp --global 

Fix -> error  fsevents@1.0.14
npm i -f


*/


browserSync.create('devServer')

var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./package.json'));
var bulma_version = json.devDependencies.bulma.trim().replace("^", "");
bulma_version = 'Bulma_' + bulma_version;
var local_dir = __dirname + '\\src\\sass\\' + bulma_version;
var exec = require('child_process').exec;

const config = {
	paths: {
		src: {
			static: [
				'./src/**/*.html',
				'./src/**/*.php',
				'./src/**/.htaccess',
				'./src/**/.log',
			],
			ignore: 'sass/plugins/**/*', // beachte Platzhalter willst Du ein Verzeichnis ignorieren ?  
			font: './src/sass/font/**/*.{ttf,woff,eof,eot,svg}', // beachte ohne base dir funktion fonts 
			img: './src/img/**/*.*', // klar alle Image sollen optimiert werden 
			sass: ['src/sass/app.sass'], // wichtig !! Stamm scss von hier aus kannst Du alle weiteren scss inludieren 
			sass_bulma_covert_datein: ['node_modules/bulma/*.+(sass|scss)', 'node_modules/bulma/sass/**/*.+(sass|scss)'], // Bluma aus node_modules importiren 
			sass_bulma_src: ['src/sass/' + bulma_version + '/'], // macht Sinn die Version von Bulma in ein eigenes Verzeichnis zu packen ;o) 
			sass_bulma_src_datein: ['src/sass/' + bulma_version + '/*.+(sass|scss)', 'src/sass/' + bulma_version + '/**/*.+(sass|scss)'], // Gulp Path für bulma_copy_from_node

			js: [ // lege hier die Reihenfolge der includierten JS-Dateien fest -> BITTE erweitern je nach bedarf
				'src/js/intern/config.js',
				'src/js/extern/fetch.js',
				'src/js/extern/umbrellajs.js',
				//'src/js/intern/**/*.js' // alle ohne Reihenfolge geht natürlich auch 
				'src/js/intern/app.js'
			]
		},
		dist: { // das sind Deine Verzeichnisse zum hochladen 
			main: './dist',
			css: './dist/css',
			js: './dist/js',
			img: './dist/img',
			font: './dist/css/fonts'

		}
	}
};

// DevServer
const devServer = (done) => {

	php.server({
		base: config.paths.dist.main,
		keepalive: true
	}, () => {
		browserSync
			.get('devServer')
			.init({
				host: 'default-web.pi',
				//proxy: 'http://www.php-template-bulma.local/',
				proxy: {
					target: "http://default-web.pi/",
					proxyReq: [
						function (proxyReq) {
							proxyReq.setHeader('X-BROWSERSYNC', 'on');
						}
					]
				},
				port: '8888',
				//https: true,
				baseDir: "./dist",
				//open: true,
				open: 'external',
				notify: false,

			});
	});

	done()
}

// BrowserSync Reload
const browserSyncReload = (done) => {

	if (browserSync.has('devServer'))
		browserSync
		.get('devServer')
		.reload()

	done()
}

// CSS herstellen und verkleinern 
const css = () => {

	return gulp.src(config.paths.src.sass)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(postcss([
			postcssImport(),
			precss(),
			autoprefixer(),

			// Finale reduziert die app.css 
			// ####### productiv entfernen !!!!!!!
			// postpurgecss({
			//	content: ['src/**/*.php', 'src/**/*.html']
			// }),
			//cssnano(),
		]))

		//	.pipe(clean())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.paths.dist.css))
		.pipe(browserSync.has('devServer') ? browserSync.get('devServer').stream() : null);
}

// Kopiert Bulma von node_modules in das Locale Verzeichnis 
const bulma_copy_from_node = (done) => {

	if (bulma_version && bulma_version.trim().length) // vorhanden 
	{

		util.log('Bulma: ' + bulma_version);
		util.log("Local Path to Save Bulma from Node : " + local_dir);

		return gulp.src(config.paths.src.sass_bulma_covert_datein, {
				base: './node_modules/bulma/'
			})
			// Ersetzt in den Bulma Dateien .sass durch .scss
			.pipe(gulp.dest(config.paths.src.sass_bulma_src))

	} else {
		util.log("Kann keine Bulma Version finden!");
	}
	done();
}


// Javascript (js/app.js) herstellen 
const scripts = () => {

	return gulp.src(config.paths.src.js)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.on('error', function (err) {
			console.error('[Compilation Error]')
			console.log('error Babel: ' + err.message + '\n')
			console.log(err.codeFrame)
			this.emit('end')
		})
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(debug({
			title: 'datei:'
		}))
		.pipe(gulp.dest(config.paths.dist.js));
}

// Test Menory
function memory() {

	const used = process.memoryUsage();
	for (let key in used) {
		util.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
	}
	const used1 = process.memoryUsage().heapUsed / 1024 / 1024;
	util.log(`The script uses approximately ${used1} MB`);
}

// Images *.webp

const imageswebp = (done) => {

	if (RASPBERRY === true) {
		gulp.src(config.paths.src.img)

			//.pipe(debug({minimal: false}))

			.pipe(rename(function (path, file) {

				if (file.isNull()) {
					util.log('Debug: file.isNull');
					return done();
				}

				if (file.isStream()) {
					util.log('Debug: file.isStream');
					return done();
				}
				if (['.jpg', '.jpeg', '.png'].indexOf(path.extname) === -1) {
					util.log('Debug: path.extname not .jpg[g] or .png');
					return done();
				}


				//cwebp [-preset <...>] [options] in_file [-o out_file]			
				// util.log(path);
				// util.log(file.path);
				// util.log(config.paths.dist.img);
				/*				
				11 Sep 08:59:37 - { dirname: '.', basename: 'IMG_3155', extname: '.png' }
				11 Sep 08:59:37 - /home/web/www/html/default-web.pi/src/img/IMG_3155.png
				11 Sep 08:59:37 - ./dist/img				
				*/
				var input_image = file.path;
				var output_image = config.paths.dist.img + '/' + path.basename + '.webp';

				exec('/usr/local/bin/cwebp -resize 600 0 ' + input_image + ' -o ' + output_image, function (err, stdout, stderr) {
					//util.log(stdout);
					//util.log(stderr);

					fs.exists(output_image, function (exists) {
						if (exists) {
							util.log('ok -> ' + output_image);
						} else {
							util.log('error:' + output_image);
						}
					});


					return 0;
				});


			}))


		done();

	} else {


		return gulp.src(config.paths.src.img)
			.pipe(imageResize({
				width: 600
			}))
			.pipe(cwebp(), memory())
			.pipe(debug({
				title: 'datei:'
			}))
			.pipe(gulp.dest(config.paths.dist.img));
		done();
	}
	done();
}


//var log = require('fancy-log');
// Images *.webp
const testen = (done) => {

	gulp.src(config.paths.src.img)

		//.pipe(debug({minimal: false}))

		.pipe(rename(function (path, file) {

			if (file.isNull()) {
				util.log('Debug: file.isNull');
				return done();
			}

			if (file.isStream()) {
				util.log('Debug: file.isStream');
				return done();
			}
			if (['.jpg', '.jpeg', '.png'].indexOf(path.extname) === -1) {
				util.log('Debug: path.extname not .jpg[g] or .png');
				return done();
			}


			//cwebp [-preset <...>] [options] in_file [-o out_file]			
			// util.log(path);
			// util.log(file.path);
			// util.log(config.paths.dist.img);
			/*				
			11 Sep 08:59:37 - { dirname: '.', basename: 'IMG_3155', extname: '.png' }
			11 Sep 08:59:37 - /home/web/www/html/default-web.pi/src/img/IMG_3155.png
			11 Sep 08:59:37 - ./dist/img				
			*/
			var input_image = file.path;
			var output_image = config.paths.dist.img + '/ggg' + path.basename + '.webp';

			exec('/usr/local/bin/cwebp -resize 600 0 ' + input_image + ' -o ' + output_image, function (err, stdout, stderr) {
				//util.log(stdout);
				//util.log(stderr);

				fs.exists(output_image, function (exists) {
					if (exists) {
						util.log('ok -> ' + output_image);
					} else {
						util.log('error:' + output_image);
					}
				});


				return 0;
			});


		}))


	done();
}


// Images optimieren
function images() {

	let plugins = [
		imagemin.gifsicle({
			interlaced: true
		}),
		imagemin.jpegtran({
			progressive: true
		}),
		imagemin.optipng({
			optimizationLevel: 5
		}),
	];


	let options = {
		verbose: true
	};

	return gulp.src(config.paths.src.img)
		.pipe(newer(config.paths.dist.img))
		.pipe(imageResize({
			width: 600
		}))
		.pipe(imagemin(plugins))
		.pipe(debug({
			title: 'datei:'
		}))
		.pipe(gulp.dest(config.paths.dist.img));
}

// Thumbs
function imagesthumb(cb) {
	let plugins = [
		imagemin.gifsicle({
			interlaced: true
		}),
		imagemin.jpegtran({
			progressive: true
		}),
		imagemin.optipng({
			optimizationLevel: 4
		}),
	];

	[100, 200, 300, 400].forEach(function (size) {
		// gulp.src('src/images/**/*.{jpg,jpeg,png}')
		gulp.src(config.paths.src.img)

			.pipe(imageResize({
				width: size
			}))
			.pipe(rename(function (path) {
				path.basename = `${path.basename}@${size}w`;
			}))
			.pipe(imagemin(plugins))
			.pipe(debug({
				title: 'datei:'
			}))
			.pipe(gulp.dest(config.paths.dist.img))
	});
	cb();
}


// Fonts 
const fonts = () => {
	return gulp.src(config.paths.src.font)
		.pipe(newer(config.paths.dist.font))
		.pipe(gulp.dest(config.paths.dist.font));
}

// sonstige Files aktualisieren
const staticFiles = () => {
	return gulp.src(config.paths.src.static, {
			base: './src'
		})
		.pipe(ignore.exclude(config.paths.src.ignore))
		.pipe(newer(config.paths.dist.main))
		.pipe(gulp.dest(config.paths.dist.main));
}

// src Verzeichnis leeren
const cleanDir = () => {
	return gulp.src(config.paths.dist.main, {
			read: false,
			allowEmpty: true
		})
		.pipe(weg());
}

// Überwachen von Änderungen 
const watchFiles = () => {
	gulp.watch('src/sass/**/*.sass', gulp.series(css));
	gulp.watch('src/js/**/*.js', gulp.series(scripts, browserSyncReload));
	gulp.watch(config.paths.src.static, gulp.series(staticFiles, browserSyncReload));
	gulp.watch('src/font/**/*', gulp.series(fonts, browserSyncReload));
	gulp.watch('src/img/**/*', gulp.series(images,  imagesthumb,imageswebp))
}


// was geht ? -> npm run -> in Console 
const build = gulp.series(cleanDir, gulp.series(gulp.parallel(css, scripts, staticFiles, fonts, images, imagesthumb), imageswebp))
const serve = gulp.series(build, gulp.parallel(watchFiles, devServer))
const watch = gulp.parallel(build, watchFiles)
const convert = gulp.series(bulma_copy_from_node)
const tests = gulp.series(testen)


exports.default = build
exports.build = build
exports.watch = watch
exports.serve = serve
exports.convert = convert
exports.css = css
exports.js = scripts
exports.clean = cleanDir
exports.fonts = fonts
exports.tests = tests
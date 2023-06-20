const { src, dest, task } = require('gulp');
const webp = require('gulp-webp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser-js');

function css(done) {
  const plugins = [
    autoprefixer(),
    cssnano()
  ];

  return src('src/sass/app.css')
    .pipe(plumber()) // Agregar el plugin plumber para manejar errores
    .pipe(sourcemaps.init()) // Iniciar generación de sourcemaps
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.')) // Escribir los sourcemaps en el mismo directorio
    .pipe(dest('dist/css'))
    .on('end', done); // Llamar a la función 'done' cuando termine la tarea
}

function javascript(done) {
  return src('src/js/**/*.js')
    .pipe(sourcemaps.init()) // Iniciar generación de sourcemaps
    .pipe(terser())
    .pipe(sourcemaps.write('.')) // Escribir los sourcemaps en el mismo directorio
    .pipe(dest('build/js'))
    .on('end', done); // Llamar a la función 'done' cuando termine la tarea
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  };

  return src('./img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    .on('end', done); // Llamar a la función 'done' cuando termine la tarea
}

function webpTask(done) {
  return src('./img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('dist/img'))
    .on('end', done); // Llamar a la función 'done' cuando termine la tarea
}

task('css', css);
task('javascript', javascript);
task('imagenes', imagenes);
task('webp', webpTask);

exports.default = javascript;
 
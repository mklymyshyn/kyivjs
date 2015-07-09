import gulp from 'gulp'
import less from 'gulp-less'
import jade from 'gulp-jade'
import runSequence from 'run-sequence'
import autoprefixer from 'gulp-autoprefixer'
import browserSync from 'browser-sync'
import minifyCSS from 'gulp-minify-css'
import speakers from './people/speakers.json'
import contacts from './people/contacts.json'
import csscomb from 'csscomb'
import plumber from 'gulp-plumber'
import combconfig  from './csscomb.json'

const comb = new csscomb(combconfig);

const locals = { speakers, contacts }

const server = browserSync.create()

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
]

gulp.task('comb', ()=> comb.processPath('./less/'))

gulp.task('css', ()=>
    gulp.src('./less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./'))
)

gulp.task('html', ()=>
    gulp.src('./jade/*.jade')
    .pipe(plumber())
    .pipe(jade({locals}))
    .pipe(gulp.dest('./'))
)

gulp.task('default', ()=> {
  server.init({server: {baseDir: './'}})
  gulp.watch(['./less/*.less', './jade/index.jade'],
             ()=> runSequence('comb', 'css', 'html', server.reload))
})

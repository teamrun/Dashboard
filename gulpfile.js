var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var coffee = require('gulp-coffee');

var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var cond = require('gulp-cond');
var changed = require('gulp-changed');

function onErr(err){
    gutil.beep();
    gutil.log( err );
}
function errHanlder(){
    return plumber({errorHandler: onErr});
}

var allFiles = ['./*', '!*.md'];
var dest = './Atom.app/Contents/Resources/app';

var atom = {
    file: ['./**/*', '!*.app', '!*.app/**/*'],
    dest: './Atom.app/Contents/Resources/app',
    trigger: './compileVersion.js'
}

var Conf = {
    less: {
        file: ['./less/dashboard.less', './less/layout*.less'],
        dest: './dist/css',
        watch: './less/**/*.less'
    },
    jade: {
        file: './jade/*.jade',
        dest: './dist/page',
        watch: './jade/**/*'
    },
    coffee: {
        file: './coffee/**/*.coffee',
        dest: './dist/lib',
        watch: './coffee/**/*.coffee',
    }
}

gulp.task('atom', function(){
    // 可以添加changed来屏蔽未更改的
  gulp.src(atom.file)
    .pipe( errHanlder() )
    .pipe( changed( atom.dest ) )
    .pipe( gulp.dest(atom.dest) );
});

gulp.task('less', function(){
    gulp.src( Conf.less.file ).pipe( less({dumpLineNumbers: 'comments'}) )
        .pipe( errHanlder() )
        .pipe(gulp.dest(Conf.less.dest));
});
gulp.task('jade', function(){
    gulp.src( Conf.jade.file )
        .pipe( jade({pretty: true}) )
        .pipe( errHanlder() )
        .pipe(gulp.dest(Conf.jade.dest));
});
gulp.task('coffee', function(){
    gulp.src( Conf.coffee.file )
    // coffee错误处理 需要监听stream的错误消息
        .pipe( coffee({bare: true}).on('error', gutil.log) )
        .pipe( errHanlder() )
        .pipe(gulp.dest(Conf.coffee.dest) );
});

gulp.task('mv', function(){
    gulp.src( './lib/**/*' )
        .pipe( changed( './dist/lib' ) )
        .pipe( gulp.dest('./dist/lib') );
});

gulp.task('watch', function(){
    
    // 或者专门弄一个文件, 这个文件改了再"编译(类似c++开发客户端的编译)"
    gulp.watch(atom.trigger, ['atom']);

    gulp.watch( Conf.less.watch, ['less'] );
    gulp.watch( Conf.jade.watch, ['jade'] );
    gulp.watch( Conf.coffee.watch, ['coffee'] );
});

gulp.task('base', [ 'less', 'jade', 'coffee' ])

gulp.task('default', ['atom', 'base']);
gulp.task('wd', ['atom', 'base', 'watch']);

var path = require('path');
var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var cond = require('gulp-cond');
var changed = require('gulp-changed');

var liveReload = require('gulp-livereload');
var port = 9085;

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
        dest: './dist',
        watch: './jade/**/*'
    },
    coffee: {
        file: './coffee/**/*.coffee',
        dest: './dist/lib',
        watch: './coffee/**/*.coffee',
    },
    concatUI: {
        file: ['./dist/lib/UIkit/index.js', './dist/lib/UIkit/**/*.js', '!./dist/lib/UIkit/cllUI.js'],
        name: 'cllUI.js',
        dest: './dist/lib/UIkit/',
        watch: ['./dist/lib/UIkit/*', '!./dist/lib/UIkit/cllUI.js']
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
    return gulp.src( Conf.coffee.file )
    // coffee错误处理 需要监听stream的错误消息
        .pipe( changed( Conf.coffee.dest, { extension: '.js' } ) )
        .pipe( coffee().on('error', gutil.log) )
        .pipe( errHanlder() )
        .pipe(gulp.dest(Conf.coffee.dest) );
});

gulp.task('concatUI', ['coffee'], function(){
    gulp.src( Conf.concatUI.file )
        .pipe( concat(Conf.concatUI.name) )
        .pipe( gulp.dest( Conf.concatUI.dest ) );
});

gulp.task('mv', function(){
    gulp.src( './lib/**/*' )
        .pipe( changed( './dist/lib' ) )
        .pipe( gulp.dest('./dist/lib') );
});

gulp.task('watch', function(){
    var LR = liveReload( port );
    
    // atom任务每次执行消耗很大...
    // 每次有文件改动都要执行一次吗?
    // 或者像前端优化scroll和resize事件处理程序一样
    //      价格setTimeout?
    // 又或者专门弄一个文件, 这个文件改了再"编译"
    // 对, 加一个触发器~ 触发文件
    gulp.watch( atom.trigger, ['atom'] );

    gulp.watch( Conf.less.watch, ['less'] );
    gulp.watch( Conf.jade.watch, ['jade'] );
    gulp.watch( Conf.coffee.watch, ['coffee'] );

    gulp.watch( Conf.concatUI.watch, ['concatUI'] );

    var cssPath = path.join(Conf.less.dest, '/*'),
        htmlPath = path.join( Conf.jade.dest, '/*' );
    gulp.watch( [cssPath, htmlPath], function( file ){
      LR.changed( file.path );
    } );
});

gulp.task('base', [ 'less', 'jade', 'concatUI' ])

gulp.task('default', ['atom', 'base']);

// 最初的wd task( watch develop 任务 )是依赖了atom任务的
// 但是某个时间点后每次启动都会再jade任务中报错,超过了文件读取数最大限制
// 查了资料才知道, OSX限制256,
// 之所以会超出是因为匹配到了node_module而且任务也需要这样的匹配
// 所以将atom从wd中里面拿了出去
// 并配合触发文件来实现watch执行atom
// 再配合上changed优化, 哼哼
// gulp.task('wd', ['atom', 'base', 'watch']);
gulp.task('wd', [ 'base', 'watch']);

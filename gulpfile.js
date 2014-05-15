var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var coffee = require('gulp-coffee');

var allFiles = ['./*', '!*.md'];
var dest = './Atom.app/Contents/Resources/app';

var atom = {
    file: ['./**/*', '!*.app', '!*.app/**/*'],
    dest: './Atom.app/Contents/Resources/app',
    trigger: './compileVersion.js'
}

var Conf = {
    less: {
        file: '',
        dest: '',
        watch: ''
    },
    jade: {
        file: '',
        dest: '',
        watch: ''
    },
    coffee: {
        file: '',
        dest: ''
    }
}

gulp.task('atom', function(){
    // 可以添加changed来屏蔽未更改的
  gulp.src(atom.file).pipe( gulp.dest(atom.dest) );
});

gulp.task('less', function(){
    gulp.src( conf.less.file ).pipe( less({dumpLineNumbers: 'comments'}) )
        .pipe(gulp.desconf.less.dest);
});
gulp.task('jade', function(){
    gulp.src( conf.jade.file ).pipe( jade() )
        .pipe(gulp.desconf.jade.dest);
});
gulp.task('coffee', function(){
    gulp.src( conf.coffee.file ).pipe( coffee() )
        .pipe(gulp.dest(conf.coffee.dest) );
});

gulp.task('watch', function(){
    
    // 或者专门弄一个文件, 这个文件改了再"编译(类似c++开发客户端的编译)"
  gulp.watch(atom.trigger, ['atom']);
});

gulp.task('default', ['atom']);
gulp.task('wd', ['atom', 'watch']);

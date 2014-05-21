## dashboard for [my blog](http://blog.chenllos.com)

### techs
* atom-shell
* seajs module
* backbone
* gulpjs task-runner
* jade
* coffeescript
* font-icon

### How to setup
    // install third-party tools and libs
    bower install
    
    // install node deps
    npm install
    
    // task-runner to build
    // if you dont has gulp cli, please install gulp first
    npm install gulp -g
    // build base files: less coffee jade and so on
    gulp base
    // transport app files to atom-shell, you should place a atom-shell default app here
    // download: https://github.com/atom/atom-shell/releases
    // cause this task will open and transport to much files, it should run separated
    gulp atom

then you can double click the atom-shell app and see my Awesome job.

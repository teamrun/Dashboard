var app = require('koa')();
var thunkify = require('thunkify');

var serve = require('koa-static');
var addTerminal = require('./termjs');

var readFile = thunkify(require('fs').readFile)


app.use(serve(__dirname + '/assets', {}));

app.use(function*(next){
    if(this.url == '/terminal.html'){
        this.set('Content-Type', 'text/html');
        this.body = yield readFile('./views/terminal.html', 'utf-8');
    }
    else{
        yield next;
    }
})

var server = require('http').Server(app.callback());
addTerminal(app, server);


var port = 8000;
server.listen(port, function(){
    console.log('app is listening at', port);
});

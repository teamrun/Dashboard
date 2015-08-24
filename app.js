var app = require('koa')();
var thunkify = require('thunkify');

var serve = require('koa-static');
var trieRouter = require('koa-trie-router');
var views = require('co-views');

var addTerminal = require('./termjs');
var addRoutes = require('./routes');


app.use(serve(__dirname + '/assets', {}));
app.use(trieRouter(app));


var server = require('http').Server(app.callback());
global.render = views(__dirname + '/views', { ext: 'jade' });

addTerminal(app, server);
addRoutes(app);


var port = 8000;
server.listen(port, function(){
    console.log('app is listening at', port);
});

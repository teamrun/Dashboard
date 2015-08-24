module.exports = function(app){
    app.get('/', function*(){
        this.body = yield render('index');
    });

    app.get('/terminal', function*(){
        this.body = yield render('terminal');
    });
}


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/manage', routes.manage);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var pg = require('pg').native;
// Configuration.
//var host = 'db-edlab.cs.umass.edu';
//var port = 7391;
//obj.conn = 'tcp://' + user + '@' + host + ':' + port + '/' + db;
	
	var connectionString = 'tcp://mgialane:chan10jr!@db-edlab.cs.umass.edu:7391/mgialane';
	//var connectionString = "pg://max:superpostgres390server@madcodemurder.sytes.net:5432/chatdb";
    //var connectionString = "pg://postgres:postgres@localhost:5432/chatdb";
    pg.connect(connectionString, function(err, client) {
      client.query('SELECT * FROM messages', function(err, result) {
		  //console.log("Number " + result.rows[0].count);
		  for(i in result){
			  console.log(i);
		  }
      });
    });
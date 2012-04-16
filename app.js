
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

//Socket IO ------------
var io = require('socket.io').listen(app);

app.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) { //Get the latest messages from database dump to screen.
  socket.emit('news', { hello: 'world' });
  
  socket.on('disconnect', function () { //Signal that user Left.
	console.log("User Disconnected.");
    io.sockets.emit('user disconnected');
  });
  
  socket.on('message', function(data){ //Send Messages to all users.
	  socket.broadcast.emit('message', {message: data});
	});
	
});
//Socket IO ------------



/* Database Testing function */
var pg = require('pg').native;

    var connectionString = "pg://postgres:postgres@localhost:5432/chatdb";
    pg.connect(connectionString, function(err, client) {
      client.query('SELECT * FROM messages', function(err, result) {
		  console.log("Number " + result.rows[0].message);
		  for(var i=0; i<result.rows.length; i++)
		  {
			  console.log(result.rows[i].message + " " + result.rows[i].tstamp);
		  }
      });
    });
	

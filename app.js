
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , pg = require('pg').native;


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
var user = 2342;

io.sockets.on('connection', function (socket) { //Get the latest messages from database dump to screen.
	
	//Load all previous Messages
    var connectionString = "pg://postgres:postgres@localhost:5432/chatdb";
    pg.connect(connectionString, function(err, client) {
      client.query('SELECT * FROM messages', function(err, result) {
		  for(var i=0; i<result.rows.length; i++)
		  {
			  socket.emit('load', { message: result.rows[i].message, time: result.rows[i].tstamp });  //Load all previous Messages for real
		  }
      });
    });
	
  
  
  socket.on('disconnect', function () { //Signal that user Left.
	console.log("User Disconnected.");
    io.sockets.emit('user disconnected');
  });
  
  socket.on('message', function(data){ //Send Messages to all users.
	  socket.broadcast.emit('message', {user: user, message: data.message, time:data.time});
	});
	
});
//Socket IO ------------



/* Database Testing function 
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
*/
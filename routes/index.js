var pg = require('pg').native;
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'MaxChat' })
};

exports.manage = function(req, res){ //Post to database
	//console.log('Message: ' + req.body.message);
	//Sanatize imput for the love of god.
	if(req.body.message.length <= 140){ //Make sure message is not to long if the client side JS fails.
		var connectionString = "pg://postgres:postgres@localhost:5432/chatdb";
		pg.connect(connectionString, function(err, client) {
		  client.query('INSERT INTO messages VALUES(default, $1, now())',[req.body.message], function(err, result) {
			  //Return something if message was inserted correctly.
			  res.render('manage', { title: 'yup', data: 'Yup' })
		  });
		});
	}
	
};//
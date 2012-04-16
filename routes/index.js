var pg = require('pg').native;
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.manage = function(req, res){ //Post to database
	//console.log('Message: ' + req.body.message);
	//Sanatize imput for the love of god.
	
    var connectionString = "pg://postgres:postgres@localhost:5432/chatdb";
    pg.connect(connectionString, function(err, client) {
      client.query('INSERT INTO messages VALUES(default, $1, now())',[req.body.message], function(err, result) {
		  //Return something if message was inserted correctly.
		  res.render('manage', { title: 'yup', data: 'Yup' })
      });
    });
	
};//
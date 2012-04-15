
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.manage = function(req, res){ //Post to database
	console.log('Message: ' + req.body.data);
};
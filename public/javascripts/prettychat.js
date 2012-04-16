// JavaScript Document bitch
$(document).ready(function() {
	
	//Submit Message Function
	$('#textbox').keyup(function(event){
		var t = $('#textbox').val(); //Message in text box.
		$('#lettercount').text("" +(t.length - 140));
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			$('#textbox').hide().val("").fadeIn(500);
			$('#lettercount').hide().text("-140").fadeIn(500); //Redo Number
			$.post("/manage", { message: t}, function(data) {
				socket.emit('message',{message:t, date: goodDate() }); //Only works if server returns info.
			});
		}
	});
});

//Functions for adding chat messages.
function addMessage(user, message, time){
	$('#conversationbox').append('<div class="color'+color+'">'+message+'<div class=tstamp>'+user+' - '+time+'</div></div>');
	$('#conversationbox').scrollTop($('#conversationbox')[0].scrollHeight); //Scroll to bottom of chat box.
	alternateRow();
}
var color = 0;
function alternateRow(){
	if(color == 0){ color = 1} else { color = 0; }	
}
function goodDate(){
	var currentTime = new Date()
	var month = currentTime.getMonth()+1
	var day = currentTime.getDate()
	var year = currentTime.getFullYear()
	return year + "-" + (("0"+month).slice(-2)) + "-" + (("0"+day).slice(-2));
}

//Socket.io
var socket = io.connect('http://localhost');

socket.on('load', function (data) { //Load previous messages on connect
	addMessage("", data.message, data.time);
	//Load number of users. 
});
  
socket.on('message', function (data) { //Adds new message when it comes in
	addMessage(data.user, data.message, goodDate());
});
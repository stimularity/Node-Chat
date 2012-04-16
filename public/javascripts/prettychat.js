// JavaScript Document bitch
$(document).ready(function() {
	//Load Chat History
	
	//Submit Message Function
	$('#textbox').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			var t = $('#textbox').val();
			$('#textbox').val("");
			//$.post("/manage", { data: t}, function(data) { });
				 //alert("Data Loaded: " + data);
				 //socket.emit('move', block);
			socket.emit('message',t);
			
		}
		event.stopPropagation();
	});
});


function addMessage(m){
	$('#conversationbox').append('<div class="color'+color+'">'+m+'</div>');
	alternateRow();
}
var color = 0;
function alternateRow(){
	if(color == 0){ color = 1} else { color = 0; }	
}
//Socket.io
var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
	//alert(data['hello']);
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  
socket.on('message', function (data) {
	addMessage(data.message);
});
// JavaScript Document bitch
$(document).ready(function() {
	//Load Chat History
	
	//Submit Message Function
	$('#textbox').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			var t = $('#textbox').val();
			$('#textbox').val("");
			$.post("/manage", { data: t},
			   function(data) {
				 alert("Data Loaded: " + data);
			   });
		}
		event.stopPropagation();
	});
});



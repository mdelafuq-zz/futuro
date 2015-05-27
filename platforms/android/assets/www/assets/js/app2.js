var _socket
var config = {
	host: '',
	port: 0,
	connectionId: '',
	onConnect:{
		success: function(connectionId){
			config.connectionId = connectionId
			$('#connectedOn').html('Connection successful, connectionId: ' + connectionId + ', host: ' + config.host + ', on port: ' + config.port)
		},
		fail: function(error){
			alert(error)
		}
	},
	onDisconnect:{
		success: function(msg){
			$('#connectedOn').html('')
			alert(msg)
		},
		fail: function(error){
			alert(error)
		}
	},
	write:{
		success: function(){
		},
		fail: function(msg){
			alert(msg)
		}
	},
	isConnected:{
		success: function(){
			return 'success isConnected'
		},
		fail: function(){

		}
	}
}

var app = {}

app.Connect = function(){
	// window.tlantic.plugins.socket.connect(
	// 	config.onConnect.success,
	// 	config.onConnect.fail,
	// 	config.host,
	// 	config.port
	// );

	socket.open(
		config.host,
		config.port,
		function() {
			alert('connect successful')
		},
		function(errorMessage) {
			alert(errorMessage)
		}
	);
}

app.Disconnect = function(){
	// window.tlantic.plugins.socket.disconnect(
	// 	config.onDisconnect.success,
	// 	config.onDisconnect.fail,
	// 	config.connectionId
	// );

	socket.close();
}

app.Write = function(message){
	// window.tlantic.plugins.socket.send(
	// 	config.write.success,
	// 	config.write.fail,
	// 	config.connectionId,
	// 	message
	// );


	var dataString = message;
	var data = new Uint8Array(dataString.length);
	for (var i = 0; i < data.length; i++) {
	  data[i] = dataString.charCodeAt(i);
	}
	socket.write(data);

}

app.isConnected = function(){
	return window.tlantic.plugins.socket.isConnected(
		config.connectionId,
		config.isConnected.success,
		config.isConnected.fail
	);
}


document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
	// document.addEventListener(window.tlantic.plugins.socket.receiveHookName, function (ev) {
	// 	alert(ev.metadata.data)
	// 	$('.console').append(ev.metadata.data + '<br>') ();    // received data
	// });
	socket = new Socket();
}

socket.onData = function(data) {
  alert(data)
};
socket.onError = function(errorMessage) {
  alert(errorMessage)
};
socket.onClose = function(hasError) {
  // invoked after connection close
};


$('.footer').on('click','.footer-item',function(){
	$('.footer-active').removeClass('footer-active')
	$(this).addClass('footer-active')
})

$(document).on('click','#connect',function(e){
	e.preventDefault()
	config.host = $('#host').val()
	config.port = $('#port').val()
	alert(config.host)
	alert(typeof(config.host))
	alert(config.port)
	alert(typeof(config.port))
	app.Connect()

	// if (app.isConnected()){
	// 	$('#connect').attr('disabled','disabled');
	// }else{
	// 	$('#connect').removeAttr('disabled');
	// }
})

$(document).on('click','#disconnect',function(e){
	e.preventDefault()
	app.Disconnect()
})

$(document).on('click','#send',function(){
	var msg = $('#textarea').val()
	app.Write(msg)
})

$(document).on('click','#clear',function(){
	$('.console').html('')
})




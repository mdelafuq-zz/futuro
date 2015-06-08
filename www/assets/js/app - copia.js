var socket;

var config = {
	host: '',
	port: 0
}

var app = {
  
}

app.Connect = function(){
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
	socket.close();
	$('#connectedOn').html('')
}

app.Write = function(message){
	var dataString = message;
	var data = new Uint8Array(dataString.length);
  alert(data)
	for (var i = 0; i < data.length; i++) {
	  data[i] = dataString.charCodeAt(i);
	}

  var resultuint=''
    for (var item in data){
      resultuint += data[item];
    }
  alert(resultuint);
	socket.write(data);
	//$('#textarea').val('')
}

document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
}

function connectToCustomHost() {
    var host = document.getElementById("host").value;
    var port = document.getElementById("port").value;
    if (host == "" || port == "") {
        alert("Host and port cannot be empty.");
    }
    else {
        connectToHost(host, parseInt(port));
    }
}

function connectToHost(host, port) {
    window.socket = new Socket();
    window.socket.onData = receiveData;
    window.socket.onError = function(errorMessage) {
        alert("Error occured, error: " + errorMessage);
    };
    window.socket.onClose = function(hasError) {
        console.info("Socket closed, hasErrors=" + hasError);
        setDisconnected();
    };

    window.socket.open(
        host,
        port,
        function(){
        	$('#connectedOn').html('Connected on ' + host + ' on port ' + port)
        },
        function(errorMessage) {
            alert("Error during connection, error: " + errorMessage);
    	}
	);
}

/*conviernte el texto recibido (ASCII) de la tarjeta a hex*/
function WriteInConsole(text) {
	// var response = ''

	// for (var i=0; i < text.length; i++){
	// 	response += text.charCodeAt(i).toString(16)
	// }

	// $('.console').append(Convert.toHex(text))
	// $('.console').append('<br>')
}

//convierte el mensaje tecleado en ascii
function hex2ascii(hexValue) {
    var hex = hexValue.toString();//force conversion
    var asciiValue = '';
    for (var i = 0; i < hex.length; i += 2)
    {
        asciiValue += String.fromCharCode( parseInt(hex.substr(i, 2), 16) );
        console.log(asciiValue)
    }
    //return asciiValue;
    app.Write(asciiValue);
}

function receiveData(data) {
    var test = ''
    for (var item in data){
      test += pad( data[item].toString(16) , 2 )
    }

    $('.console').append(test);
    $('.console').append('<br>');
}

/*funcion solo para el menu*/
$('.footer').on('click','.footer-item',function(){
	$('.footer-active').removeClass('footer-active')
	$(this).addClass('footer-active')
})

$(document).on('click','#connect',function(e){
	e.preventDefault()
	connectToCustomHost()
})

$(document).on('click','#disconnect',function(e){
	e.preventDefault()
	app.Disconnect()
})

$(document).on('click','#send',function(){
	var msg = $('#textarea').val()
	hex2ascii(msg);
})

$(document).on('click','#clear',function(){
	$('.console').html('')
})

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



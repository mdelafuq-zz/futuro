var socket;

var config = {
	host: '',
	port: 0
}

var Convert = {
     chars: " !\"#$%&amp;'()*+'-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
     hex: '0123456789ABCDEF', bin: ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'],

     decToHex: function(d){
          return (this.hex.charAt((d - d % 16)/16) + this.hex.charAt(d % 16));
     },
     toBin: function(ch){
          var d = this.toDec(ch);
          var l = this.hex.charAt(d % 16);
          var h = this.hex.charAt((d - d % 16)/16);

          var hhex = "ABCDEF";
          var lown = l < 10 ? l : (10 + hhex.indexOf(l));
          var highn = h < 10 ? h : (10 + hhex.indexOf(h));
          return this.bin[highn] + ' ' + this.bin[lown];
     },
     toHex: function(ch){
          return this.decToHex(this.toDec(ch));
     },
     toDec: function(ch){
          var p = this.chars.indexOf(ch);
          return (p <= -1) ? 0 : (p + 32);
     }
};

var app = {}

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
	for (var i = 0; i < data.length; i++) {
	  data[i] = dataString.charCodeAt(i);
	}
	socket.write(data);
	$('#textarea').val('')
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

function WriteInConsole(text) {
	// var response = ''

	// for (var i=0; i < text.length; i++){
	// 	response += text.charCodeAt(i).toString(16)
	// }

	$('.console').append(Convert.toHex(text))
	$('.console').append('<br>')
}

function receiveData(data) {
	// $('.console').append(data + '<br>')
    var chars = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
        chars.push(String.fromCharCode(data[i]));
    }
    var dataString = chars.join("");
    dataString.split(/(?:\r\n|\r|\n)/g).forEach(WriteInConsole);
}

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
	app.Write(msg)
})

$(document).on('click','#clear',function(){
	$('.console').html('')
})




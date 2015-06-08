var socket;

var connection = {
    host: '',
    port: 0,

    Connect: function(){
        connection.host = document.getElementById("host").value;
        connection.port = document.getElementById("port").value;
        if (connection.host == "" || connection.port == "") {
            alert("No debe quedar campos vacios.");
            return
        }
        
        //aqui iba window.socket = new Socket()

        window.socket.open(
            connection.host,
            connection.port,
            function(){
                $('#connectedOn').html('Connected on ' + connection.host + ' on port ' + connection.port)
            },
            function(errorMessage) {
                alert("Error during connection, error: " + errorMessage);
            }
        );
        
    },

    Disconnect: function(){
        socket.close();
        $('#connectedOn').html('')
    },

    Write: function(cmd){
        var dataString = cmd;
        var data = new Uint8Array(dataString.length);

        for (var i = 0; i < data.length; i++) {
          data[i] = dataString.charCodeAt(i);
        }

        var resultuint = ''
        for (var item in data){
          resultuint += data[item];
        }

        socket.write(data);
    },

    Read: function (data) {
        var response = ''
        for (var item in data){
          response += convert.toHex( data[item] )
        }

        decode.slicer(response)



        $('.console').append(response);
        $('.console').append('<br>');
    }
}

var convert = {
    hex2ascii: function (hexValue) {
        var hex = hexValue.toString();//force conversion
        var asciiValue = '';
        for (var i = 0; i < hex.length; i += 2)
        {
            asciiValue += String.fromCharCode( parseInt(hex.substr(i, 2), 16) );
            console.log(asciiValue)
        }
        //return asciiValue;
        connection.Write(asciiValue);
        return asciiValue
    },
    AddZero: function (n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    },
    toHex: function(unicodeValue){
        var hex = unicodeValue.toString(16)
        return convert.AddZero( hex , 2 )
    }
}

var decode = {
    start: '',
    serialNo: '',
    idCmd: '',
    ACK: '',
    checksum: '',
    end: '',

    slicer: function(response){
      response.length
      response = '235E 00000008DC1E61CF 0001 0006B39BAE45070404050607 0018 3C3F'
      response = '235E00000008DC1E61CF00010006B39BAE4507040405060700183C3F'

      decode.start = response.substr(0, 3)
      decode.serialNo = response.substr(4, 19)
      decode.idCmd = response.substr(20, 23)
      decode.ACK = response.substr(24, response.length-9)
      decode.checksum = response.substr(response.length-8, response.length-5)
      decode.end = response.substr(response.lenth-4, response.length-1)

      decode.CommandToRead(decode.idCmd)
    }

    CommandToRead: function(idCmd){
      switch(idCmd){
        case '0001' break; // estado actual
        case '0100' break; // modificar fecha
        case '0400' break; // Modificar configuracion
        case '0A00' break; // Leer configuracion
        case '0500' break; // Agregar un usuario
        case '0600' break; // Eliminar un usuario 
        case '0B00' break; // Descargar bitacora
        case '0C00' break; // Descargar bloque de usuario (opcional si Admin)
        case '0900' break; // Encender/apagar SP (SP1 luz, SP2 aire, SP3 opcional)
        case '0001' break; // 
        case '0001' break; // 
        case '0001' break; // 
        default: alert('La respuesta no puede ser interpretada') break;
      }
    }

    function abrirpuerta(){

    }

}



document.addEventListener("deviceready", onDeviceReady, false);
$("[name='checkbox_foco']").bootstrapSwitch();
$.fn.bootstrapSwitch.defaults.size = 'large';


function onDeviceReady() {
    window.socket = new Socket();
    window.socket.onData = connection.Read;
    window.socket.onError = function(errorMessage) {
        alert("Error occured, error: " + errorMessage);
    };
    window.socket.onClose = function(hasError) {
        console.info("Socket closed, hasErrors=" + hasError);
        setDisconnected();
    };
}

//convierte el mensaje tecleado en ascii




/*funcion solo para el menu*/
$('.footer').on('click','.footer-item',function(){
	$('.footer-active').removeClass('footer-active')
	$(this).addClass('footer-active')
})

$(document).on('click','#connect',function(e){
	e.preventDefault()
    connection.Connect()
})

$(document).on('click','#disconnect',function(e){
	e.preventDefault()
	connection.Disconnect()
})

$(document).on('click','#send',function(){
	var cmd = convert.hex2ascii($('#textarea').val());
    app.Write(cmd)
})

$(document).on('click','#clear',function(){
	$('.console').html('')
})

$(document).ready(function(){
    $('#nav').hide()
})



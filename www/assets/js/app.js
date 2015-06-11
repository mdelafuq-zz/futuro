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
                //alert("Conectado al servidor socket")
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

        $('.console').append(response);
        $('.console').append('<br>');
        decode.slicer(response)

    }
}

var convert = {
    hex2ascii: function (hexValue) {
        var hex = hexValue.toString();//force conversion
        var asciiValue = '';
        for (var i = 0; i < hex.length; i += 2)
        {
            asciiValue += String.fromCharCode( parseInt(hex.substr(i, 2), 16) );
        }
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

      decode.start = response.substr(0, 4)
      //alert(decode.start)
      decode.serialNo = response.substr(4, 16)
      //alert(decode.serialNo)
      decode.idCmd = response.substr(20, 4)
      //alert(decode.idCmd)
      decode.ACK = response.substring(24, response.length-8);
      //alert(decode.ACK)
      decode.checksum = response.substr(response.length-8, 4)
      //alert(decode.checksum)
      decode.end = response.substr(response.length-4, 4)
      //alert(decode.end)

      decode.CommandToRead()
    },

    CommandToRead: function(){
      switch(decode.idCmd){
        case '0001': break; // estado actual
        case '0100': break; // modificar fecha
        case '0400': break; // Modificar configuracion
        case '0A00': break; // Leer configuracion
        case '0500': break; // Agregar un usuario
        case '0600': break; // Eliminar un usuario 
        case '0B00': break; // Descargar bitacora
        case '0C00': break; // Descargar bloque de usuario (opcional si Admin)
        case '0900': break; // Encender/apagar SP (SP1 luz, SP2 aire, SP3 opcional)
        default: alert('La respuesta no puede ser interpretada'); break;
      }
    }

}

var controller = {

    sendCommand: function(idCmdSend){
      switch(idCmdSend){
        case '0100': break; // modificar fecha

        case '0400': // Modificar configuracion 
          var olt = convert.toHex(parseInt($('#olt').val()));
          var odt = convert.toHex(parseInt($('#odt').val()));
          var odtl = convert.toHex(parseInt($('#odtl').val()));
          var odtln = convert.toHex(parseInt($('#odtln').val()));
          alert(olt)                                                      
          var paramsconfigHex = '235e'+'0400'+'607C75C6949360' + olt + odt + '010500020301' + odtln +'01020000'+'00143c3f' 
                              /* 235e   0400   607C75C6949360     0a   0c      010500020301    14     01020000   00143c3f*/
          alert(paramsconfigHex)
          var paramsConfigASCII = convert.hex2ascii(paramsconfigHex)
          alert(paramsConfigASCII)
          connection.Write(paramsConfigASCII)
        break;

        case '0A00': break; // Leer configuracion
        case '0500': break; // Agregar un usuario
        case '0600': break; // Eliminar un usuario 
        case '0B00': break; // Descargar bitacora
        case '0C00': break; // Descargar bloque de usuario (opcional si Admin)
        case '0900': break; // Encender/apagar SP (SP1 luz, SP2 aire, SP3 opcional)
        default: alert('No se reconoce comando a envíar'); break;
      }
    }
}



document.addEventListener("deviceready", onDeviceReady, false);

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

$(document).on('switchChange.bootstrapSwitch','input[name="my-checkbox"]', function(event, state) {
  console.window(this); // DOM element
  console.log(event); // jQuery event
  console.log(state); // true | false
});


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
  alert(cmd)
    connection.Write(cmd)
})

$(document).on('click','#btn_config',function(){
  //connection.Connect()
  controller.sendCommand('0400')
})


$(document).on('click','#clear',function(){
	$('.console').html('')
})

$(document).ready(function(){
    $("[name='checkbox_foco']").bootstrapSwitch();
})



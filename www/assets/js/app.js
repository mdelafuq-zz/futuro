app = {
  Start: function(){
    app.RegisterRoutes()
    window.location = '#/acceso'
    app.Sammy.run()
    return
  },

  RegisterRoutes: function(){
    app.Sammy = $.sammy('#container', function () {

      this.get('/', function (context) { window.location = '#/acceso' })
      this.get('#/?', function (context) { app.Show404() })

      this.get('#/acceso/?', function (context) { app.Render.Access() })
      this.get('#/iluminacion/?', function (context) { app.Render.Illumination() })
      this.get('#/climatizacion/?', function (context) { app.Render.Climate() })
      this.get('#/config/?', function (context) { app.Render.Config() })

      // this.get('#/climatizacion/:id/?', function (context) { app.Resident.RenderRegulation(context.params['id']) })

      this.notFound = function (context) { if (context !== 'post') { app.Show404() } }

      this.swap = function (content, callback) {
          var context = this
          context.$element().fadeOut('150', function () {
              context.$element().html(content).fadeIn('250', function () {

                  if (callback) {
                      callback.apply()
                  }
              })
          })
      }
    })
  },

  Render:{},
  Sammy: null
}

app.Render.Access = function(){
  $('#navbar').removeClass('hidden')
  $('#footer').removeClass('hidden')
  
  var html="";
      html += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; max-height:100%'>";
      html += "    <div id='lock' style='max-height:100%'>";
      html += "        <i class=\"fa fa-lock fa-3x\"><\/i>";
      html += "    <\/div>";
      html += "<\/div>";
  app.Sammy.swap(html)
}

app.Render.Illumination = function(){
  // if(encendido){
  //   hasesto()
  // }else{
  //   haslotro()
  // }

  // encendido ? hazesto() : hazlotro()
  // html += "        <input type=\"checkbox\" name=\"checkbox_foco\" checked='" (endendido ? 'true' : 'false' ) "'>";

  var html="";
      html += "<div id=\"iluminacion\" class=\"col-xs-12 content hidden\" align='center'>";
      html += "    <div class='foco'>";
      html += "        <i class=\"fa fa-lightbulb-o  fa-5x\" name=\"focus\" style='max-width:100%; max-height:inherit'><\/i><\/br>";
      html += "        <input type=\"checkbox\" name=\"checkbox_foco\" checked='true'>";
      html += "    <\/div>";
      html += "<\/div>";
  app.Sammy.swap(html,function(){
      $("[name='checkbox_foco']").bootstrapSwitch();
      $('#iluminacion').fadeIn()
  })
}

app.Render.Climate = function(){
  var html="";
      html += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%'>";
      html += "    3   ";
      html += "<\/div>";
  app.Sammy.swap(html)
}

app.Render.Config = function(){
  var html="";
      html += "<a href=\"console.html\"  class=\"btn btn-info\" id=\"btn\" role=\"button\">Console mode<\/a>";
      html += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%'>";
      html += "    <div class=\"panel panel-default\">";
      html += "        <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
      html += "            <h3 class=\"panel-title\" style=\"text-align: center;\">Tiempos de acceso<\/h3>";
      html += "        <\/div>";
      html += "        <div class=\"panel-body\">";
      html += "            <div class=\"form-group\">";
      html += "                <input type=\"number\" class=\"form-control\" id=\"olt\" placeholder=\"Opening lock timer (seg)\" value=\"\">";
      html += "            <\/div>";
      html += "            <div class=\"form-group\">";
      html += "                <input type=\"number\" class=\"form-control\" id=\"odt\" placeholder=\"Opening door timeout (seg)\" value=\"\">";
      html += "            <\/div>";
      html += "            <div class=\"form-group\">";
      html += "                <input type=\"number\" class=\"form-control\" id=\"odtl\" placeholder=\"Opened door time limit (seg)\" value=\"\">";
      html += "            <\/div>";
      html += "            <div class=\"form-group\">";
      html += "                <input type=\"number\" class=\"form-control\" id=\"odtln\" placeholder=\"Opened door time limit notifier (seg)\" value=\"\">";
      html += "            <\/div>";
      html += "            <button id=\"btn_config\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Cambiar configuración<\/button>";
      html += "        <\/div>";
      html += "    <\/div>   ";
      html += "<\/div>";
      html += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%'>";
      html += "    <div class=\"panel panel-default\">";
      html += "        <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
      html += "            <h3 class=\"panel-title\" style=\"text-align: center;\">Fecha y hora<\/h3>";
      html += "        <\/div>";
      html += "        <div class=\"panel-body\">";
      html += "            <div class=\"form-group\">";
      html += "                <input type=\"number\" class=\"form-control\" id=\"time\" placeholder=\"Opening lock timer (seg)\" value=\"\">";
      html += "            <\/div>";
      html += "            <button id=\"btn_hora\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Modificar hora<\/button>";
      html += "        <\/div>";
      html += "    <\/div>   ";
      html += "<\/div>";
      html += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" >";
      html += "<\/div>";
  app.Sammy.swap(html)
}

var socket;

var connection = {
    host: '192.168.0.50',
    port: 10001,

    Connect: function(){
        // connection.host = document.getElementById("host").value;
        // connection.port = document.getElementById("port").value;
        // if (connection.host == "" || connection.port == "") {
        //     alert("No debe quedar campos vacios.");
        //     return
        // }
        
        //aqui iba window.socket = new Socket()

        window.socket.open(
            connection.host,
            connection.port,
            function(){
                // $('#connectedOn').html('Connected on ' + connection.host + ' on port ' + connection.port)
                alert("Conectado al servidor socket")
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

        // $('.console').append(response);
        // $('.console').append('<br>');
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
        case '0001': alert('estado Actual'); break; // estado actual
        case '0100': break; // modificar fecha
        case '0400': alert('llego aqui'); break; // Modificar configuracion
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
    },

    changeDate: function(){

    },

    changeSettings: function(olt, odt, odtl){
        alert(olt)                                                      
        var paramsconfigHex = '235e'+'0400'+'607C75C6949360' + olt + odt + '010500020301' + odtl +'01020000'+'00143c3f' 
                            /* 235e   0400   607C75C6949360     0a   0c      010500020301    14     01020000   00143c3f*/
        alert(paramsconfigHex)
        var paramsConfigASCII = convert.hex2ascii(paramsconfigHex)
        alert(paramsConfigASCII)
        connection.Write(paramsConfigASCII)
    },

    readSettings: function(){

    },

    addUser: function(){

    },

    removeUser: function(){

    },

    readUsers: function(){

    },

    readLog: function(){

    },

    openDoor: function(){

    },

    toggleSP: function(){

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
  var olt = convert.toHex(parseInt($('#olt').val()));
  var odt = convert.toHex(parseInt($('#odt').val()));
  var odtl = convert.toHex(parseInt($('#odtl').val()));

  connection.Connect()
  controller.changeSettings(olt, odt, odtl)
})


$(document).on('click','#clear',function(){
	$('.console').html('')
})

$(document).ready(function(){
})



app = {
  Start: function(){
    app.RegisterRoutes()
    window.location = '#/connection'
    app.Sammy.run()
    return
  },

  RegisterRoutes: function(){
    app.Sammy = $.sammy('#app-container', function () {

      this.get('/', function (context) { window.location = '#/connection' })
      this.get('#/?', function (context) { app.Show404() })

      this.get('#/connection/?', function (context) { app.Render.Con() })
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
  Sammy: null,
  counter:0

  // Globals:{
  //   Door: false,
  //   SP1: false,
  //   SP2: false
  // }
}

app.Render.Con = function(){
  var html="";
  html += "<div id=\"login\" class=\"col-xs-12 content\" align='center'>";
  html += "    <div class=\"col-md-4\">";
  html += "        <section class=\"login-form\">";
  html += "            <form id='logform' method=\"post\" action=\"#\" role=\"login\">";
  html += "                <img src='assets/img/futuro.png' class=\"img-responsive\" alt=\"\" \/><br>";
  html += "                <input id=\"txtIP\" placeholder=\"IP Address\" required class=\"form-control input-lg\" value=\"192.168.0.69\" \/><br>";
  html += "                <input class=\"form-control input-lg\" id=\"port\" placeholder=\"Port\" required=\"\" value=\"10001\" \/><br>";
  html += "                <div class=\"pwstrength_viewport_progress\"><\/div><br>";
  html += "                <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Sign in<\/button><br>";
  html += "                <div>";
  html += "                    <a href=\"http:\/\/www.futurointeligente.com\/\">Futuro Inteligente!<\/a>";
  html += "                <\/div>";
  html += "            <\/form>";
  html += "        <\/section>  ";
  html += "    <\/div>";
  html += "<\/div>";
  app.Sammy.swap(html)
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
  $('#navbar').removeClass('hidden')
  $('#footer').removeClass('hidden')
  
  var html="";
      html += "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; max-height:100%'>";
      html += "    <div id='lock' style='max-height:100%'>";
      html += "        <i id='doorIcon' class='fa fa-3x " + ( global.doorStatus ? 'fa-unlock-alt' : 'fa-lock' ) + "'><\/i>";
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
      html += "        <i class=\"fa fa-lightbulb-o  fa-5x\" id=\"focus\" style='max-width:100%; max-height:inherit'><\/i>";
      html += "    <\/div>";
      html += "    <div>";
      html += "        <input id=\"ckbx_ilum\" type=\"checkbox\" checked data-toggle=\"toggle\">";
      html += "    <\/div>";
      html += "<\/div>";
  app.Sammy.swap(html,function(){
      $('#ckbx_ilum').bootstrapToggle();
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
  html += "<div id='config'>";
  html += "     <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%'>";
  html += "         <a href=\"console.html\"  class=\"btn btn-info\" id=\"btn\" role=\"button\">Console mode<\/a>";
  html += "         <div class=\"panel panel-default\">";
  html += "             <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
  html += "                 <h3 class=\"panel-title\" style=\"text-align: center;\">Tiempos de acceso<\/h3>";
  html += "             <\/div>";
  html += "             <div class=\"panel-body\">";
  html += "                 <div class=\"form-group\">";
  html += "                     <input type=\"number\" class=\"form-control\" id=\"olt\" placeholder=\"Opening lock timer (seg)\" value=\"\">";
  html += "                 <\/div>";
  html += "                 <div class=\"form-group\">";
  html += "                     <input type=\"number\" class=\"form-control\" id=\"odt\" placeholder=\"Opening door timeout (seg)\" value=\"\">";
  html += "                 <\/div>";
  html += "                 <div class=\"form-group\">";
  html += "                     <input type=\"number\" class=\"form-control\" id=\"odtl\" placeholder=\"Opened door time limit (seg)\" value=\"\">";
  html += "                 <\/div>";
  html += "                 <button id=\"btn_config\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Cambiar configuración<\/button>";
  html += "             <\/div>";
  html += "         <\/div>   ";
  html += "     <\/div>";
  html += "     <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%'>";
  html += "         <div class=\"panel panel-default\">";
  html += "             <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
  html += "                 <h3 class=\"panel-title\" style=\"text-align: center;\">Fecha y hora<\/h3>";
  html += "             <\/div>";
  html += "             <div class=\"panel-body\">";
  html += "                 <div align=\"center\">";
  html += "                     <input type=\"datetime-local\" id=\"datetime\"><br>";
  html += "                 <\/div><br>";
  html += "                 <div align=\"center\">";
  html += "                     <button id=\"btn_hora\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Modificar hora<\/button>";
  html += "                 <\/div>";
  html += "             <\/div>";
  html += "         <\/div>";
  html += "     <\/div>";
  html += " <\/div>";
    app.Sammy.swap(html, function(){
      controller.readSettings()
    })
}

var socket;

var global = {
    doorStatus: false,
    completeResp:'',
    responseArray:[],
    flagOnOfSP: '',
    timeRead: '',
    oltRead: '',
    odtRead: '',
    odtlRead: '',
    noError: true
}

var connection = {

    host: '192.168.0.69',
    port: 10001,
    Connect: function(){
        // connection.host = document.getElementById("txtIP").value;
        // connection.port = document.getElementById("Port").value;
        // if (connection.host == "" || connection.port == "") {
        //     alert("No debe quedar campos vacios.");
        //     return
        // }

        window.socket.open(
            connection.host,
            connection.port,
            function(){
                // $('#connectedOn').html('Connected on ' + connection.host + ' on port ' + connection.port)
                alert("Conectado a la tarjeta inteligente")
                window.location = '#/acceso'
            },
            function(errorMessage) {
                alert("Error during connection, error: " + errorMessage);
                window.location = '#/connection'
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
        // app.counter++
        // alert(app.counter)
        // var response=[]
        var response = ''
        for (var item in data){
          response += convert.toHex( data[item] )
          // response.push(convert.toHex( data[item] ))
        }
        // response.join('')
        // alert(response)
        // $('.console').append(response);
        // $('.console').append('<br>');
        // decode.slicer(response)
        decode.fixResponse(response)

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
      // alert(response)
      response.length
      // alert(response)
      decode.start = response.substr(0, 4)
      // alert(decode.start)
      decode.serialNo = response.substr(4, 16)
      // alert(decode.serialNo)
      decode.idCmd = response.substr(20, 4)
      // alert(decode.idCmd)
      decode.ACK = response.substring(24, response.length-8);
      // alert(decode.ACK)
      decode.checksum = response.substr(response.length-8, 4)
      // alert(decode.checksum)
      decode.end = response.substr(response.length-4, 4)
      // alert(decode.end)
      global.responseArray.length = 0
      decode.CommandToRead()
    },

    slicerdatetime:function(datetime){
        var sec = "00"
        var min = datetime.substr(-2, 2)
        var hour = datetime.substr(-5, 2)
        var dayWeek = "04"
        var dayMonth = datetime.substr(8, 2)
        var Month = datetime.substr(5, 2)
        var year = datetime.substr(2, 2)

        var paramsDateTime= sec.concat(min,hour,dayWeek,dayMonth,Month,year)
        // alert(paramsDateTime)
        controller.changeDate(paramsDateTime)

    },

    fixResponse: function(incompResp){
        var startResp = incompResp.substr(0, 4)
        // alert(startResp)
        var endResp = incompResp.substr(incompResp.length-4, 4)
        // alert(endResp)

        if (startResp =='235e' && endResp =='3c3f') {
            global.completeResp = incompResp
            decode.slicer(global.completeResp)
            // alert('Respuesta completa: ' + global.completeResp)
            global.completeResp = ''
        }else if (startResp == '235e' && endResp != '3c3f' || startResp != '235e' && endResp != '3c3f'|| startResp != '235e') {
            global.responseArray.push(incompResp)
            global.completeResp = global.responseArray.join('')
            var startArray = global.completeResp.substr(0, 4)
            var endArray = global.completeResp.substr(global.completeResp.length-4, 4)

            if (startArray == '235e' && endArray == '3c3f') {
                decode.slicer(global.completeResp)
                alert(global.completeResp)
                global.responseArray.length = 0
                global.completeResp = ''
            }
        }
    },

    CommandToRead: function(){
        switch(decode.idCmd){
          case '0001': // estado actual
              var ACKstate = decode.ACK
              // alert(ACKstate)
              var secRead = ACKstate.substr(10, 2)
              var minRead = ACKstate.substr(12, 2)
              var hourRead = ACKstate.substr(14, 2)
              var dayMonthRead = ACKstate.substr(18, 2)
              var MonthRead = ACKstate.substr(20, 2)
              var yearRead = ACKstate.substr(22, 2)

              var doorRead = parseInt( ACKstate.substr(4, 2), 16 )
              if (doorRead >= 148 && doorRead <= 198){
                global.doorStatus = true
                $('#doorIcon').removeClass('fa-lock').addClass('fa-unlock-alt')
              }else{
                global.doorStatus = false
                $('#doorIcon').removeClass('fa-unlock-alt').addClass('fa-lock')
              }

              global.timeRead = '20'+ yearRead +'-'+ MonthRead +'-'+ dayMonthRead +'T'+ hourRead +':'+ minRead +':'+ secRead
              document.getElementById("datetime").value = global.timeRead
          break; 
          case '0100': // modificar fecha
              if (decode.ACK == '01') {
                  alert('Hora y fecha modificada con éxito')
              }else{alert('Error al modificar hora y fecha');}
          break; 
          case '0400': // Modificar configuracion
              if (decode.ACK == '01') {
                  alert('Nueva configuracion agregada con éxito')
              }else{alert('Error al agregar configuracion');}
          break; 
          case '0a00': // Leer configuracion
              var oltRead = decode.ACK.substr(14, 2)
              var odtRead = decode.ACK.substr(16, 2)
              var odtlRead = decode.ACK.substr(30, 2)

              document.getElementById("olt").value = oltRead
              document.getElementById("odt").value = odtRead
              document.getElementById("odtl").value = odtlRead

              $('#olt').val(oltRead)
              $('#odt').val(odtRead)
              $('#odtl').val(odtlRead)
          break; 
          case '0500': break; // Agregar un usuario
          case '0600': break; // Eliminar un usuario 
          case '0b00': break; // Descargar bitacora
          case '0c00': break; // Descargar bloque de usuario (opcional si Admin)
          case '0900': // Encender/apagar SP (SP1 luz, SP2 aire, SP3 opcional)
              switch (decode.ACK){
                  case '00':
                      alert('Error al intentar utilizar SP');
                      global.noError = false
                      alert(global.noError)
                      $('#ckbx_ilum').bootstrapToggle('off')
                  break;
                  case '01':
                      if (global.flagOnOfSP == 'SP200') {
                          alert('Foco encendido');
                          // document.getElementById('focus').style.color="#E5CA19";
                          global.flagOnOfSP = ''
                      }else if (global.flagOnOfSP == 'SP201'){
                          alert('Foco apagado');
                          // document.getElementById('focus').style.color="#333";
                          global.flagOnOfSP = ''
                      }
                  break;
                  default: alert('La respuesta no puede ser interpretada SP'); break;
              }
          break; 
          default: alert('La respuesta no puede ser interpretada'); break;
      }
    }

}

var controller = {

    changeDate: function(paramsDT){ //LISTO
        var cmdChangeDate = convert.hex2ascii('235e'+'0100' + paramsDT + '00073c3f')
        // alert(cmdChangeDate)
        connection.Write(cmdChangeDate)
    },

    changeSettings: function(olt, odt, odtl){
        var cmdconfigHex = '235e'+'0400'+'607C75C6949360' + olt + odt + '010500020301' + odtl +'01020000'+'00143c3f' 
                         /* 235e   0400   607C75C6949360     0a   0c      010500020301    14     01020000   00143c3f*/
        // alert(cmdconfigHex)
        var paramsConfigASCII = convert.hex2ascii(cmdconfigHex)
        // alert(paramsConfigASCII)
        connection.Write(paramsConfigASCII)
    },

    readSettings: function(){ //LISTO
        var cmdRedConfig = convert.hex2ascii("235e0a0000003c3f")
        connection.Write(cmdRedConfig)
    },

    addUser: function(){

    },

    removeUser: function(){

    },

    readUsers: function(){
        var cmdReadUser = convert.hex2ascii('235e0c0000003c3f')
        connection.Write(cmdReadUser)
    },

    readLog: function(){

    },

    openDoor: function(){

    },

    toggleSP: function(paramsSP){ //LISTO ILUMINACION
        switch(paramsSP){
            case '00':// encender SP2 ILUMINACION
                var cmdOnSP2 = convert.hex2ascii("235e09000000013c3f")
                // alert(cmdOnSP2)
                connection.Write(cmdOnSP2)
            break; 
            case '01':// apagar SP2 ILUMINACION
                var cmdOfSP2 = convert.hex2ascii("235e09000100013c3f")
                // alert(cmdOfSP2)
                connection.Write(cmdOfSP2)
            break; 
            case '02':// encender SP3

            break; 
            case '03':// apagar SP3

            break; 
            default: alert('La tarea no puede ser interpretada'); break;
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


$(document).on('click','#btn_config',function(){
  var olt = convert.toHex(parseInt($('#olt').val()));
  var odt = convert.toHex(parseInt($('#odt').val()));
  var odtl = convert.toHex(parseInt($('#odtl').val()));

  controller.changeSettings(olt, odt, odtl)
})

$(document).on('click','#btn_hora',function(){
  var datetimeValue = document.getElementById("datetime").value;
  console.log(datetimeValue)

  decode.slicerdatetime(datetimeValue)
})

$(document).on('click','#send',function(){
	var cmd = convert.hex2ascii($('#textarea').val());
  alert(cmd)
    connection.Write(cmd)
})

$(document).on('click','#clear',function(){
  $('.console').html('')
})

$(document).on('submit','#logform',function(e){
  e.preventDefault()
  // window.location = 'acceso.html'
  connection.Connect()
})


$(document).on('change','#ckbx_ilum', function(){
    if (global.noError) {
        if ( this.checked /*$(this).prop('checked')==true*/) {
            ilum = 'true'
            global.flagOnOfSP = 'SP200'
            controller.toggleSP('00') //encender sp2 ILUMINACION
        }else{
            global.flagOnOfSP = 'SP201'
            controller.toggleSP('01') //apagar sp2 ILUMINACION
        }
    }else{global.noError=true; alert(global.noError)}
})

// $(document).on('change','#chcbox',function(){ //ILUMINACION.HTML
//     // access properties using this keyword
//     if ( this.checked ) {
//         // if checked ...
//         alert( this.checked);
//     } else {
//         // if not checked ...
//         alert(this.checked)
//     }
// });
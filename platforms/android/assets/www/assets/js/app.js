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
      this.get('#/loginId/?', function (context) { app.Render.Login() })
      this.get('#/acceso/?', function (context) { app.Render.Access() })
      this.get('#/iluminacion/?', function (context) { app.Render.Illumination() })
      this.get('#/climatizacion/?', function (context) { app.Render.Climate() })
      this.get('#/config/?', function (context) { app.Render.Config() })
      this.get('#/users/?', function (context) { app.Render.Users() })

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
  counter:0,

}

app.Loading="";
app.Loading += "<div class=\"container-fluid\" style='height:inherit'>";
app.Loading += "    <div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\" >";
app.Loading += "    <\/div>";
app.Loading += "    <div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" style='text-align:center; height:inherit; display:table; margin-top:-52px'>";
app.Loading += "        <span class='span-vcenter'>";
app.Loading += "            <img src=\"assets\/img\/loading.gif\" \/>";
app.Loading += "        <\/span>";
app.Loading += "    <\/div>";
app.Loading += "    <div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\">";
app.Loading += "    <\/div>";
app.Loading += "<\/div>";

app.Render.Con = function(){
  var html="";
  html += "<div class=\"col-xs-12 col-sm-6 col-sm-offset-3\" align='center'>";
  html += "   <form id='connectForm' method=\"post\" action=\"#\" role=\"login\">";
  html += "       <img src='assets/img/futuro.png' class=\"img-responsive\" alt=\"\" \/><br>";
  html += "       <input type='text' id=\"txtIP\" placeholder=\"IP Address\" required class=\"form-control input-lg\" value=\"192.168.0.60\" \/><br>";
  html += "       <input type='number' id=\"port\" class=\"form-control input-lg\" placeholder=\"Port\" required=\"\" value=\"10001\" \/><br>";
  html += "       <div class=\"pwstrength_viewport_progress\"><\/div><br>";
  html += "       <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Sign in<\/button><br>";
  html += "       <div>";
  html += "           <a href=\"http:\/\/www.futurointeligente.com\/\">Futuro Inteligente<\/a>";
  html += "       <\/div>";
  html += "   <\/form>";
  html += "<\/div>";
  app.Sammy.swap(html)
}

app.Render.Login = function(){
  controller.readUsers()
  var html="";
  html += "<div id=\"login\" class=\"col-xs-12 content\" align='center'>";
  html += "    <div class=\"col-md-4\">";
  html += "        <section class=\"login-form\">";
  html += "            <form id='logForm' method=\"post\" action=\"#\" role=\"login\">";
  html += "                <img src='assets/img/futuro.png' class=\"img-responsive\" alt=\"\" \/><br>";
  html += "                <input id=\"txtID\" placeholder=\"Ingrese su ID (20 DIGITOS)\" required class=\"form-control input-lg\" value=\"\" \/><br>";
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
      html += "<div id='acceso' class=\"row\" style='margin:0px; height:inherit;'>";
      html += "    <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center\" style='height:inherit'>";
      html += "        <div id='lock' class='table-div' style='margin:0 auto; color:black'>";
      html += "            <span class='span-vcenter'>";
      html += "                <i id='lockIcon' class='fa fa-3x " + ( global.lockStatus ? 'fa-unlock-alt' : 'fa-lock' ) + "'><\/i>";
      html += "            <\/span>";
      html += "        <\/div>";
      html += "    <\/div>";
      html += "    <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center\" style='height:inherit'>";
      html += "        <div id='door' class='table-div' style='margin:0 auto'>";
      html += "            <span class='span-vcenter'>";
      html += "                <img id='door-image' src='" + ( global.doorStatus ? 'assets\/img\/door-open-512.png' : 'assets\/img\/door-closed-512.png' ) + "'><\/i>";
      html += "            <\/span>";
      html += "        <\/div>";
      html += "    <\/div>";
      html += "<\/div>";

  app.Sammy.swap(html, function(){
  })
}

app.Render.Illumination = function(){
  $('#navbar').removeClass('hidden')
  $('#footer').removeClass('hidden')
  var html="";
      html += "<div id=\"iluminacion\" class=\"col-xs-12 content hidden\" align='center'>";
      html += "    <div class='foco'>";
      // html += "     <i class=\"fa fa-lightbulb-o  fa-5x\" id=\"focus\" style='max-width:100%; max-height:inherit'><\/i>";
      html += "        <img id=\"img-foco\" src='" + ( global.sp2Status ? 'assets\/img\/foco-on-512.png' : 'assets\/img\/foco-off-512.png' ) + "' class=\"img-responsive\"><\/i>";
      html += "    <\/div>";
      html += "    <div><br>"; 
      html += "        <input id=\"ckbx_ilum\" type=\"checkbox\" data-toggle=\"toggle\">";
      html += "    <\/div>";
      html += "<\/div>";
  app.Sammy.swap(html, function(){
      if (global.sp2Status) {
        global.noError = false
        $('#ckbx_ilum').bootstrapToggle('on')
      }else{
        global.noError = false
        $('#ckbx_ilum').bootstrapToggle('off')
      }
      
      $('#iluminacion').fadeIn()
  })
}

app.Render.Climate = function(){
  $('#navbar').removeClass('hidden')
  $('#footer').removeClass('hidden')
  var html="";
      html += "<div id=\"climatizacion\" class=\"col-xs-12 content hidden\" align='center'>";
      html +=     "<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%' \" align='center'>";
      html +=     "    <div>";
      html +=     "        <img id=\"img-aire\" src='assets\/img\/Air-conditioner-ON_512.png' class=\"img-responsive\"><\/i>";
      html +=     "        <input id=\"check_climate\" type=\"checkbox\" checked data-toggle=\"toggle\">";
      html +=     "    <\/div>";
      html +=     "<\/div>";
      html += "<\/div>";
  app.Sammy.swap(html, function(){
      if (global.sp3Status) {
        global.noError = false
        $('#check_climate').bootstrapToggle('on')
      }else{
        global.noError = false
        $('#check_climate').bootstrapToggle('off')
      }
      $('#climatizacion').fadeIn()
  })
}

app.Render.Config = function(){
  $('#navbar').removeClass('hidden')
  $('#footer').removeClass('hidden')
  $('#nav-title').html('Futuro Inteligente')
  var html="";
  html += "<div id='config'>";
  html += "     <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">";
  // html += "         <a href=\"console.html\"  class=\"btn btn-info\" id=\"btn\" role=\"button\">Console mode<\/a>";
  html += "         <div class=\"panel panel-default\">";
  html += "             <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
  html += "                 <h3 class=\"panel-title\" style=\"text-align: center;\">Tiempos de acceso<\/h3>";
  html += "             <\/div>";
  html += "             <div class=\"panel-body\">";
  html += "                 <div class=\"form-group\">";
  html += "                     <label>Tiempo de Apertura de Cerradura (seg)</label>";
  html += "                     <input type=\"number\" class=\"form-control\" id=\"olt\" placeholder=\"Opening lock timer (seg)\" value='" + global.oltRead + "'>";
  html += "                 <\/div>";
  html += "                 <div class=\"form-group\">";
  html += "                     <label>Tiempo de espera de puerta abierta (seg)</label>";
  html += "                     <input type=\"number\" class=\"form-control\" id=\"odt\" placeholder=\"Opening door timeout (seg)\" value='" + global.odtRead + "'>";
  html += "                 <\/div>";
  html += "                 <div class=\"form-group\">";
  html += "                     <label>Tiempo Error Apertura de Puerta (seg)</label>";
  html += "                     <input type=\"number\" class=\"form-control\" id=\"odtl\" placeholder=\"Opened door time limit (seg)\" value='" + global.odtlRead + "'>";
  html += "                 <\/div>";
  html += "                 <button id=\"btn_config\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Cambiar configuración<\/button>";
  html += "             <\/div>";
  html += "         <\/div>   ";
  html += "     <\/div>";

  html += "     <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">";
  html += "         <div class=\"panel panel-default\">";
  html += "             <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
  html += "                 <h3 class=\"panel-title\" style=\"text-align: center;\">Fecha y hora<\/h3>";
  html += "             <\/div>";
  html += "             <div class=\"panel-body\">";
  html += "                 <div align=\"center\">";
  html += "                     <input type=\"datetime-local\" id=\"datetime\" value= '" + global.timeRead + "' class='form-control'><br>";
  html += "                 <\/div><br>";
  html += "                 <div align=\"center\">";
  html += "                     <button id=\"btn_hora\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Modificar hora<\/button>";
  html += "                 <\/div>";
  html += "             <\/div>";
  html += "         <\/div>";
  html += "     <\/div>";

  html += "     <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='margin-bottom:55px'>";
  html += "         <div class=\"panel panel-default\">";
  html += "             <div class=\"panel-heading\" style=\"background-color: solid gray;\">";
  html += "                 <h3 class=\"panel-title\" style=\"text-align: center;\">Usuarios<\/h3>";
  html += "             <\/div>";
  html += "             <div class=\"panel-body\">";
  html += "                 <div style='text-align: justified'>";
  html += "                     <p>En este apartado se podrá consultar, agregar y eliminar usuarios.</p>";
  html += "                 <\/div><br>";
  html += "                 <div align=\"center\">";
  html += "                     <button id=\"btn-download-users\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\">Mostrar usuarios<\/button>";
  html += "                 <\/div>";
  html += "             <\/div>";
  html += "         <\/div>";
  html += "     <\/div>";
  html += " <\/div>";
    app.Sammy.swap(html, function(){
      controller.readSettings()
    })
}

app.Render.Users = function(){
    $('#nav-title').html('Usuarios')
    $('#footer').addClass('hidden')

    app.Sammy.swap(app.Loading)
    controller.readUsers()
}

app.Render.UsersHTML = function(){
    var html = "";
        html += "<div id='userDiv' class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\" style='height:100%; min-height:100%'>";
        html += "    <table class=\"table table-hover\">";
        html += "        <thead>";
        html += "            <tr>";
        html += "                <th>Localidad<\/th>";
        html += "                <th>ID tarjeta<\/th>";
        html += "                <th><\/th>";
        html += "            <\/tr>";
        html += "        <\/thead>";
        html += "        <tbody>";
        for(var i=0; i<global.usrArray.length; i++)
        {
            html += "           <tr>";
            html += "               <td>" +i+ "<\/td>";
            if (global.usrArray[i].charAt(0) == 'f') {
                html += "               <td>Disponible<\/td>";
                html += "               <td><button data-localidad='"+ i +"' data-user='"+ global.usrArray[i] +"' class='btn btn-default btn-agregar'>Agregar<\/button><\/td>";
            }else{
                html += "               <td>"+ global.usrArray[i] +"<\/td>";
                html += "               <td><button data-localidad='"+ i +"' data-user='"+ global.usrArray[i] +"' class='btn btn-default btn-eliminar'>Eliminar<\/button><\/td>";
            }
            html += "           <\/tr>";
        }
        html += "        <\/tbody>";
        html += "    <\/table>";
        html += "<\/div>";

        app.Sammy.swap(html)
}

var socket;

var global = {
    lockStatus: false,
    doorStatus: false,
    sp2Status: false,
    sp3Status: false,
    completeResp:'',
    responseArray:[],
    flagOnOffSP: '',
    timeRead: '',
    oltRead: '',
    odtRead: '',
    odtlRead: '',
    noError: true,
    usrArray: [],
    userID: ''
}

var connection = {

    host: '',
    port: 0,
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
                // alert("Conectado a la tarjeta inteligente")
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
        var response = ''
        for (var item in data){
          response += convert.toHex( data[item] )
          // response.push(convert.toHex( data[item] ))
        }
        // $('.console').append(response)
        // $('.console').append('<br>')
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
                // alert(global.completeResp)
                global.responseArray.length = 0
                global.completeResp = ''
            }
        }
    },

    CommandToRead: function(){
        switch(decode.idCmd){
          case '0001': // estado actual LISTO
              var ACKstate = decode.ACK
              // alert(ACKstate)
              var secRead = ACKstate.substr(10, 2)
              var minRead = ACKstate.substr(12, 2)
              var hourRead = ACKstate.substr(14, 2)
              var dayMonthRead = ACKstate.substr(18, 2)
              var MonthRead = ACKstate.substr(20, 2)
              var yearRead = ACKstate.substr(22, 2)

              var sp2Status = ACKstate.substr(2, 2)
              if (sp2Status == '0d' || sp2Status == '05'){
                  global.sp2Status = true
              }else{
                  global.sp2Status = false
              }

              var doorRead = parseInt( ACKstate.substr(4, 2), 16 )

              if (doorRead >= 148 && doorRead <= 198){
                global.doorStatus = true
                $("#door-image").attr("src", 'assets/img/door-open-512.png')
              }else{
                global.doorStatus = false
                $("#door-image").attr("src", 'assets/img/door-closed-512.png')
                global.lockStatus = false
                $('#lockIcon').removeClass('fa-unlock-alt').addClass('fa-lock')
              }

              global.timeRead = '20'+ yearRead +'-'+ MonthRead +'-'+ dayMonthRead +'T'+ hourRead +':'+ minRead +':'+ secRead
              $('#datetime').val(global.timeRead)
          break; 
          case '0100': // modificar fecha LISTO
              if (decode.ACK == '01') {
                  alert('Hora y fecha modificada con éxito')
              }else{alert('Error al modificar hora y fecha');}
          break; 
          case '0400': // Modificar configuracion LISTO
              if (decode.ACK == '01') {
                  alert('Nueva configuracion agregada con éxito')
              }else{alert('Error al agregar configuracion');}
          break; 
          case '0a00': // Leer configuracion LISTO
              global.oltRead = decode.ACK.substr(14, 2)
              global.odtRead = decode.ACK.substr(16, 2)
              global.odtlRead = decode.ACK.substr(30, 2)

              $('#olt').val(global.oltRead)
              $('#odt').val(global.odtRead)
              $('#odtl').val(global.odtlRead)
          break; 
          case '0500': // Agregar un usuario
              if (decode.ACK == '01'){
                  controller.readUsers()
                  app.Sammy.swap(app.Loading)
              }else{alert('Error al agregar usuario')}
          break; 
          case '0600': // Eliminar un usuario
              controller.readUsers()
              app.Sammy.swap(app.Loading)
          break; 
          case '0b00': // Descargar bitacora
          break; 
          case '0c00': // Descargar bloque de usuario LISTO
              var allUsers = decode.ACK
              global.usrArray = allUsers.match(/.{1,20}/g)
              $(document).trigger("usuarioscargados")
          break; 
          case '0900': // Encender/apagar SP (SP1 luz, SP2 aire, SP3 opcional) LISTO
              switch (decode.ACK){
                  case '00':
                      if (global.flagOnOffSP == 'SP200' || global.flagOnOffSP == 'SP201') {
                          alert('Error al intentar prender foco')
                          global.noError = false
                          $('#ckbx_ilum').bootstrapToggle('off')
                          global.sp2Status = false
                      }else if (global.flagOnOffSP == 'SP302' || global.flagOnOffSP == 'SP303'){
                          alert('Error al intentar prender aire')
                          global.noError = false
                          $('#check_climate').bootstrapToggle('off')
                      }
                  break;
                  case '01':
                      if (global.flagOnOffSP == 'SP200') {
                          // alert('Foco encendido')
                          $("#img-foco").attr("src","assets/img/foco-on-512.png")
                          global.sp2Status = true
                      }else if (global.flagOnOffSP == 'SP201'){
                          // alert('Foco apagado')
                          $("#img-foco").attr("src","assets/img/foco-off-512.png")
                          global.sp2Status = false
                      }else if (global.flagOnOffSP == 'SP302'){
                          // alert('Aire encendido')
                          global.sp3Status = true
                      }else if (global.flagOnOffSP == 'SP303'){
                          // alert('Aire apagado')
                          global.sp3Status = false
                      }
                  break;
                  default: alert('La respuesta no puede ser interpretada SP'); break;
              }
          break; 
          case '1100': // CERRADURA LISTO
              if(decode.ACK === '01'){
                  // alert('Cerradura abierta')
                  global.lockStatus = true
                  $('#lockIcon').removeClass('fa-lock').addClass('fa-unlock-alt')
              }else{
                  alert('No se pudo ejecutar el comando')
                  global.lockStatus = false
                  $('#lockIcon').removeClass('fa-unlock-alt').addClass('fa-lock')
              }
          break;
          case '0003': //eventos LISTO
              switch(decode.checksum){
                  case 'f001':
                      alert('Evento F0: Sabotaje en alarma')
                  break;
                  case 'f101':
                      alert('Evento F1: Alarma activada por entrada abierta')
                  break;
                  case 'f201':
                      alert('Evento F2: Fallo en energía')
                  break;
                  case 'f301':
                      alert('Evento F3: Batería baja')
                  break;
                  case 'f401':
                      alert('Evento F4: Reinicialización del sistema')
                  break;
                  case 'f501':
                      alert('Evento F5: Autoapagado')
                  break;
                  case 'f601':
                      alert('Evento F6: Acceso permitido por terminal')
                  break;
                  case 'f701':
                      alert('Evento F7: Terminal fuera de línea')
                  break;
                  case 'f801':
                      alert('Evento F8: Recuperación de sabotaje')
                  break;
                  case 'f901':
                      alert('Evento F9: Recuperación de puerta forzada')
                  break;
                  case 'fa01':
                      alert('Evento FA: Recuperación en fallo de energía')
                  break;
                  case 'fb01':
                      alert('Evento FB: Batería normal')
                  break;
                  case 'fc01':
                      alert('Evento FC: Terminal en línea')
                  break;
                  case 'fd01':
                      alert('Evento FD: Etiqueta *FIN no encontrada')
                  break;
                  case 'fe01':
                      alert('Evento FE: Reajuste de hora')
                  break;
                  case 'ff01':
                      alert('Evento FF: Alarma puerta video proyector abierta')
                  break;
                  case 'e001':
                      alert('Evento E0: Error en apertura de puerta')
                  break;
                  case 'e101':
                      alert('Evento E1: Error puerta dejada abierta')
                  break;
                  case 'e201':
                      alert('Evento E2: Acceso permitido por terminal (tarjeta FI)')
                  break;
                  default: alert('El evento no puede ser interpretado'); break;
              }
          break;
          default: alert('La respuesta no puede ser interpretada'); break;
      }
    }

}

var controller = {

    changeDate: function(paramsDT){ // CAMBIAR FECHA/HORA LISTO
        var cmdChangeDate = convert.hex2ascii('235e'+'0100' + paramsDT + '00073c3f')
        // alert(cmdChangeDate)
        connection.Write(cmdChangeDate)
    },

    changeSettings: function(olt, odt, odtl){ // CAMBIAR CONFIGURACION LISTO
        var cmdconfigHex = '235e'+'0400'+'607C75C6949360' + olt + odt + '010500020301' + odtl +'01020000'+'00143c3f' 
                         /* 235e   0400   607C75C6949360     0a   0c      010500020301    14     01020000   00143c3f*/
        // alert(cmdconfigHex)
        var paramsConfigASCII = convert.hex2ascii(cmdconfigHex)
        // alert(paramsConfigASCII)
        connection.Write(paramsConfigASCII)
    },

    readSettings: function(){ // LEER CONFIG LISTO
        var cmdRedConfig = convert.hex2ascii("235e0a0000003c3f")
        connection.Write(cmdRedConfig)
    },

    openDoor: function(){ //ABRIR PUERTA LISTO
        var cmdOpenDoor = convert.hex2ascii('235e110000003c3f')
        connection.Write(cmdOpenDoor)
    },

    toggleSP: function(paramsSP){ // ILUMINACION LISTO
        switch(paramsSP){
            case '00':// encender SP2 ILUMINACION
                var cmdOnSP2 = convert.hex2ascii("235e09000000013c3f")
                connection.Write(cmdOnSP2)
            break; 
            case '01':// apagar SP2 ILUMINACION
                var cmdOfSP2 = convert.hex2ascii("235e09000100013c3f")
                connection.Write(cmdOfSP2)
            break; 
            case '02':// encender SP3
                var cmdOfSP3 = convert.hex2ascii("235e09000200013c3f")
                connection.Write(cmdOfSP3)
            break; 
            case '03':// apagar SP3
                var cmdOfSP3 = convert.hex2ascii("235e09000300013c3f")
                connection.Write(cmdOfSP3)
            break; 
            default: alert('La tarea no puede ser interpretada'); break;
        }
    },

    addUser: function(localidad, id){
        var cmdAddUser = convert.hex2ascii('235e0500' + localidad + id + '000C3c3f')
        connection.Write(cmdAddUser)
    },

    removeUser: function(locality){
        var cmdRemoveUser = convert.hex2ascii('235e0600'+locality+'00023c3f')
        connection.Write(cmdRemoveUser)
        // controller.readUsers()
    },

    readUsers: function(){ // DESCARGAR USUARIO LISTO
        var cmdReadUser = convert.hex2ascii('235e0c0000003c3f')
        connection.Write(cmdReadUser)
    },

    readLog: function(){

    }
}


document.addEventListener("deviceready", onDeviceReady, false);

$(document).on('usuarioscargados',function(){
    app.Render.UsersHTML()
})



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

//LISTENNER

/*funcion solo para el menu*/
$('.footer').on('click','.footer-item',function(){
	$('.footer-active').removeClass('footer-active')
	$(this).addClass('footer-active')
})

$(document).on('click','#connect', function(e){
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
  decode.slicerdatetime(datetimeValue)
})

$(document).on('click','#btn-download-users',function(){
    window.location = '#/users'
})

$(document).on('click','#send',function(){
	var cmd = convert.hex2ascii($('#textarea').val());
  alert(cmd)
    connection.Write(cmd)
})

$(document).on('click','#clear',function(){
  $('.console').html('')
})

$(document).on('click','#lockIcon',function(){
  controller.openDoor()
})

$(document).on('click','.btn-eliminar',function(){
    var deleteUser = confirm("¿Confirma eliminar este usuario?");
    if (deleteUser) {
        var localidad = convert.AddZero(convert.toHex($(this).data('localidad')), 4)
        global.userID= $(this).data('user')
        controller.removeUser(localidad)
    }
})

$(document).on('click','.btn-agregar',function(){
    var localidad = convert.AddZero(convert.toHex($(this).data('localidad')), 4)
    var user = prompt('Ingrese ID de tarjeta')
    if (user != null){
        if (user.length != 20){
            alert('La longitud debe ser 20')
            return
        }else if (user.match(/[^0-9]/i)){
            alert('El ID debe contener solo números')
            return
        }
        for (var i=0; i<global.usrArray.length; i++){
            if(user == global.usrArray[i]){
                alert('Esta tarjeta está en uso.')
                return
            }
        }
        controller.addUser(localidad, user)
    }
})

$(document).on('submit','#connectForm', function (e){
  e.preventDefault()
  var host = $('#txtIP').val()
  var port = parseInt($('#port').val())
  connection.host = host
  connection.port = port
  connection.Connect()
})

$(document).on('change','#ckbx_ilum', function(){
    if (global.noError) {
        if ( this.checked /*$(this).prop('checked')==true*/) {
            global.flagOnOffSP = 'SP200'
            controller.toggleSP('00') //encender sp2 ILUMINACION
        }else{
            global.flagOnOffSP = 'SP201'
            controller.toggleSP('01') //apagar sp2 ILUMINACION
        }
    }else{global.noError=true;}
})

$(document).on('change','#check_climate', function(){
    if (global.noError) {
        if ( this.checked /*$(this).prop('checked')==true*/) {
            global.flagOnOffSP = 'SP302'
            controller.toggleSP('02') //encender sp3 CLIMATIZACION
        }else{
            global.flagOnOffSP = 'SP303'
            controller.toggleSP('03') //apagar sp3 CLIMATIZACION
        }
    }else{global.noError=true;}
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
window.onload = function () { main()}

function main() {
  //detectamos el navegador
    // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  if(isOpera){alert("Estas usando Opera !!");}
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if(isFirefox){alert("Estas usando Firefox, es el mejor para este juego !!");}
  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  if(isSafari){alert("Estas usando Safari, te gustan los iPhones!!");}
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  if(isIE){alert("Estas usando IE !!");}
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  if(isEdge){alert("Estas usando Edge!!");}
  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  if(isChrome){alert("Estas usando Chrome, cuidado, google tendra toda tu informacion!!");}
  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  if(isBlink){alert("Estas usando Blink !!");}
  //juego
  var mapa = document.querySelector('a-scene');
  var p = -1.05; //coordenada y del muro
  var direc = "";//ireccion a la que ira el camino
  var lado = 1;
  do{
     var nombre = prompt("Con que area del Laberinto quiere jugar usted?(para telefonos es recomendable una menor de 21):  ");
      if(nombre %2 ==0 && nombre > 6){alert("Introduzca una area impar por favor, gracias!!")}
      else if(nombre < 7){ alert("Por favor, algo mas de competitividad, intenta un laberinto mas grande !!:")}
      else if(nombre < 71){alert("Por amor a vuestro dispositivo y la fluides, os restringimos tal area. Por favor, intente una mas pequeña!");}
  }while(nombre % 2 == 0 || nombre < 6 || nombre > 71)
  alert("Usted eligio " + nombre+ ". Que la suerte os acompañe!!!");
  lado = nombre;
  //if(!isFirefox){lado = 7;} //en caso que no sea firefox
  if(lado == 1){window.location.reload(); }

  //var lado = 43;
  /*
    Este metodo añade un cubo al mapa para construir el laberinto
    @param: x,y: coordenadas respectivas
  */

  /**location.reload();*/

  var user = document.getElementById('user');
  user.setAttribute('win-listener', {x: (lado-3)*3, z: (lado-3)*3});
  console.log((lado-2)*3);

  function pared(x,y,z){
    var muro = document.createElement('a-box');         //creo el cubo que sera nuestro muro
    muro.setAttribute('geometry', {
      depth: 3,
      width: 3,
      height: 8
    });
    muro.setAttribute('position', {x: x,y: y,z: z});    //declaramos la posicion
    muro.setAttribute('shadow','cast','true');          //declaramos la sombra
    muro.setAttribute('material',{src:"#ladrillos"});
    muro.setAttribute('static-body','');
    mapa.appendChild(muro);                             //añado mi muro al mapa
  }

  function suelo(x,y,z){
      var tierra = document.createElement('a-box');         //creo el cubo que sera nuestro muro
      tierra.setAttribute('geometry', {
        depth: 3,
        width: 3,
        height: 1
      });
      tierra.setAttribute('position', {x: x,y: y,z: z});    //declaramos la posicion
      tierra.setAttribute('shadow','cast','true');          //declaramos la sombra
      tierra.setAttribute('material',{src:"#floor"});
      tierra.setAttribute('static-body','');
      mapa.appendChild(tierra);                             //añado mi muro al mapa
  }
  techo(3.5,lado);
  function techo(y,lado){
      var tierra = document.createElement('a-box');         //creo el cubo que sera nuestro muro
      tierra.setAttribute('geometry', {
        depth: 3*lado,
        width: 3*lado,
        height: 1
      });
      tierra.setAttribute('position', {x: 3*lado/2-2,y: y,z: 3*lado/2-2});    //declaramos la posicion
      tierra.setAttribute('shadow','cast','true');          //declaramos la sombra
      tierra.setAttribute('material',{src:"#techo", repeat: {x: lado, y: lado}});
      tierra.setAttribute('static-body','');
      mapa.appendChild(tierra);                             //añado mi muro al mapa
  }

  laberinto(lado,lado); 

  /**metodo para dibujar el laberinto*/
  function laberinto(ancho, largo){
    //dibujo las paredes exteriores que limitaran el campo
    for(var i = 0;i < ancho;i++){pared(-3,0,i *3 - 3); pared((largo -1) *3 - 3,0,i*3 - 3);} 
    for(var j = 0;j < largo;j++){pared(j *3-3,0,0 - 3); pared(j*3 - 3,0,(ancho-1) *3 - 3);} 

/*    suelo(0*3,p,0*3);
    suelo(lado *3 -6,p,lado*3 -6);
    suelo(0,p,lado*3 -6);
    suelo(lado*3,p,0);

    var i = 1;
    console.log("va");
    suelo(i*3,p,i*3);i=2;
    suelo(i*3,p,i*3);
    suelo(3*3,p,4*3);
*/
    dibujarMapa();
    function dibujarMapa(){
      //creo el array multidimensional del mapa
      var tablaJuego = new Array(ancho-2);

      for(var i= 0; i < ancho -2; i++){//multiplicar por 3 para el metodo viejo
        tablaJuego[i] = new Array(largo-2);
      }
      /*relleno el array con ceros para despues aplicar 
      el algoritmo del laberinto*/
      for (var i = 0; i < ancho -2; i++) {
        for(var j = 0; j < largo -2; j++){
          tablaJuego[i][j] = 0; 
        }
      }
      /*
      for(var i = 0; i < ancho; i++){
          for(var j = 0; j < largo; j++){
                techo(i*3 - 1,p,j*3 - 1);
          }
      }*/
      var lin;
/*
      fetch('laberinto.txt')
      .then(res => res.text())
      .then(content => {
      var lines = content.split(/\n/);
      lines.forEach(line => console.log(Array.from(lines)));
      //lines.forEach(line => lin = Array.from(lines));
      //lines.forEach(line => console.log(line));
      });*/

      //console.log(lines);
      //console.log(" + " + lin[1]);




      var caminoEncontrado = false;
      construccion(0,0,lado,lado,"up");//inicio la funcio :)
      rellenar();
      suelo((lado-3)*3,p,(lado-3)*3);
      /*metodo recursivo que buscara y creara el laberinto
       @param: posX,posY se encargan de la posicion actual del metodo
       y @param ancho, alto: se encargan de la posicion final del metodo recursivo*/
      function construccion(posX, posY, ancho, largo, direc){
        //console.log("hola principio");
        var desplazamiento = parseInt(Math.random()*3);//elijo un desplazamiento entre 1 y 5 bloques
        //console.log(desplazamiento + " esta aqui" + posX + " " + posY);
        if(posX== lado-2 && posY== lado-2){return;}
        //caso en que se disputara a boleo a donde ira
        else{ 
          var direccion = parseInt(Math.random()*3);//saco la variable a boleo
          //console.log("direccion " + direccion);
          var px = (posX+1 <= lado -2);//X positiva
          var nx = (posX-1 >= 0);//X negativa
          var py = (posY+1 <= lado -2);//Y positiva 
          var ny = (posY-1 >= 0);
          var px1 = (posX+2 <= lado -2);//X positiva
          var nx1 = (posX-2 >= 0);//X negativa
          var py1 = (posY+2 <= lado -2);//Y positiva 
          var ny1 = (posY-2 >= 0);

          console.log( direccion);
          //direccion

          var sos = true;
          
          do{
            if(posX== lado-2 && posY== lado-2){suelo(posX *3,p,posY *3);return;}

            else {
              var possibilities = shuffle([0,1,2,3]);
              while(possibilities.length > 0) {
                direccion = possibilities.pop();
                if(direccion == 0 && px&& px1 && tablaJuego[posX + 1][posY] != 3 && tablaJuego[posX +2][posY] !=3 && direc != "down"){
                    //console.log("entra PX" + direccion);
                    //caminoEncontrado = true;
                    tablaJuego[posX][posY] = 3;
                    tablaJuego[posX+1][posY] = 3;
                    //suelo(posX *3,p,posY *3);
                    //suelo((posX +1) *3 ,p,posY *3 );
                    construccion(posX + 2, posY, ancho, largo,"up");
                    sos = false;
                }else if(direccion == 1 && py&&py1 && tablaJuego[posX][posY +1] != 3 && tablaJuego[posX][posY +2] !=3 && direc != "left"){
                    //console.log("entra PY" + direccion);
                    //caminoEncontrado = true;
                    tablaJuego[posX][posY] = 3;
                    tablaJuego[posX][posY+1] = 3;
                    //suelo(posX *3,p,posY *3);
                    //suelo(posX *3 ,p,(posY +1) *3 );
                    construccion(posX, posY +2, ancho, largo,"rigth");
                    sos = false;
                }else if(direccion == 2 && ny &&ny1&& tablaJuego[posX][posY -1] != 3 && tablaJuego[posX][posY -2] !=3 && direc != "right"){

                    //console.log("entra NY" + direccion);
                    //caminoEncontrado = true;
                    tablaJuego[posX][posY] = 3;
                    tablaJuego[posX][posY-1] = 3;
                    //suelo(posX*3,p,posY*3);
                    //suelo(posX *3 ,p,(posY -1) *3 );
                    construccion(posX, (posY -2), ancho, largo,"left");
                    sos = false;
                } else if(direccion == 3 && nx&& nx1 && tablaJuego[posX -1][posY] != 3 && tablaJuego[posX -2][posY] !=3 && direc != "up"){
                    //console.log("entra PX" + direccion);
                    //caminoEncontrado = true;
                    tablaJuego[posX][posY] = 3;
                    tablaJuego[posX-1][posY] = 3;
                    //suelo(posX *3,p,posY *3);
                    //suelo((posX -1) *3 ,p,posY *3 );
                    construccion(posX - 2, posY, ancho, largo,"down");
                    sos = false;
                } else {
                  //console.log('SOS');
                }
              }
            }
          }while(caminoEncontrado == true)
        }
      }
      rellenar();
      function rellenar (){
        //console.log("pintando");
        for(var i = 0; i < ancho-2; i++){
          for(var j = 0; j < largo-2; j++){
                //console.log(tablaJuego[i][j]);
                if(tablaJuego[i][j] != 3 || !tablaJuego[lado-3][lado-3])pared(i*3,p,j*3);
          }
        }
      }
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
    }
  }
}

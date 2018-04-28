window.onload = function () { main()}

AFRAME.registerComponent('static-movement', {
    schema: {default: ''},
    init: function () {
       var el = this.el;
       el.addEventListener('click', function () {
          document.querySelector('#player').setAttribute('position', el.getAttribute('position'));
          console.log("Click: Player moved");
       });
    }
});

function main() {
  var mapa = document.querySelector('a-scene');
  var p = -0.4; //coordenada y del muro
  var direc = "";//ireccion a la que ira el camino
  var lado = 30;
  /*
    Este metodo añade un cubo al mapa para construir el laberinto
    @param: x,y: coordenadas respectivas
  */

  function pared(x,y,z){
    var muro = document.createElement('a-box');         //creo el cubo que sera nuestro muro
    muro.setAttribute('geometry', {
      depth: 3,
      width: 3,
      height: 6
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

  function techo(x,y,z){
      var tierra = document.createElement('a-box');         //creo el cubo que sera nuestro muro
      tierra.setAttribute('geometry', {
        depth: 3,
        width: 3,
        height: 6
      });
      tierra.setAttribute('position', {x: x,y: y,z: z});    //declaramos la posicion
      tierra.setAttribute('shadow','cast','true');          //declaramos la sombra
      tierra.setAttribute('material',{src:"#techo"});
      tierra.setAttribute('static-body','');
      mapa.appendChild(tierra);                             //añado mi muro al mapa
  }

  laberinto(lado,lado); 

  /**metodo para dibujar el laberinto*/
  function laberinto(ancho, largo){
    //dibujo las paredes exteriores que limitaran el campo
    for(var i = 0;i < ancho;i++){pared(-3,0,i *3 - 3); pared(largo *3 - 3,0,i*3 - 3);} 
    for(var j = 0;j < largo;j++){pared(j *3-3,0,0 - 3); pared(j*3 - 3,0,ancho *3 - 3);} 

    dibujarMapa();
    function dibujarMapa(){
      //creo el array multidimensional del mapa
      var tablaJuego = new Array(ancho);

      for(var i= 0; i < ancho; i++){//multiplicar por 3 para el metodo viejo
        tablaJuego[i] = new Array(largo);
      }
      /*relleno el array con ceros para despues aplicar 
      el algoritmo del laberinto*/
      for (var i = 0; i < ancho; i++) {
        for(var j = 0; j < largo; j++){
          tablaJuego[i][j] = 0; 
        }
      }
      for(var i = 0; i < ancho; i++){
          for(var j = 0; j < largo; j++){
                techo(i*3 - 1,6,j*3 - 1);
          }
      }

      for(var i = 0; i < ancho; i++){
          for(var j = 0; j < largo; j++){
                var r = Math.random();
                if(r > 0.65)pared(i*3,0,j*3);
          }
      }

      //construccion(0,0,lado,lado,"up");//inicio la funcio :)
      /*metodo recursivo que buscara y creara el laberinto
       @param: posX,posY se encargan de la posicion actual del metodo
       y @param ancho, alto: se encargan de la posicion final del metodo recursivo*/
      /*function construccion(posX, posY, ancho, largo, direc){
        //console.log("hola principio");
        var desplazamiento = Math.random() * (5-1)+1;//elijo un desplazamiento entre 1 y 5 bloques
        //console.log(desplazamiento + " esta aqui" + posX + " " + posY);
        //if(posX >=lado || posY >= lado){return;}
        //caso en que se disputara a boleo a donde ira
        //else{ 
          var direccion = Math.random();//saco la variable a boleo
          //console.log("direccion " + direccion);
          var px = (posX+1 <= ancho);//X positiva
          var nx = (posX-1 >= 0);//X negativa
          var py = (posY+1 <= largo);//Y positiva 
          var ny = (posY-1 >= 0);
          console.log( direccion);
          //direccion
          var caminoEncontrado = false;
          do{
            if(direc == "up"){
              if(direccion <= 0.3 && px && tablaJuego[posX + 1][posY] != 3){

                  console.log("entra PX" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX + 1, posY, ancho, largo,"up");
              }else if(direccion <= 0.6 && py && tablaJuego[posX][posY +1] != 3){

                  console.log("entra PY" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX, posY +1, ancho, largo,"rigth");
              }else if(direccion <= 1 && ny && tablaJuego[posX][posY -1] != 3){

                  console.log("entra NY" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX*3,p,posY*3);
                  construccion(posX, -(posY -1), ancho, largo,"left");
              }else if(direccion <= 1 && nx && tablaJuego[posX-1][posY] != 3){

                  console.log("entra NX" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX*3,p,posY*3);
                  construccion(-(posX-1), posY, ancho, largo,"left");
              }else console.log("sale en" + direccion);return;
            }else if(direc == "down"){
              if(direccion <= 0.3 && nx && tablaJuego[posX - 1][posY] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(-(posX- 1), posY, ancho, largo,"down");
              }else if(direccion <= 0.6 && py && tablaJuego[posX][posY +1] != 3){

                 //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX, posY +1, ancho, largo, "rigth");
              }else if(direccion <= 1 && ny && tablaJuego[posX][posY -1] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX, -(posY-1), ancho, largo,"left");
              }else return;
            }else if(direc == "left"){
              if(direccion <= 0.3 && px && tablaJuego[posX + 1][posY] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX + 1, posY, ancho, largo,"up");
              }else if(direccion <= 0.6 && nx && tablaJuego[posX -1][posY] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(-(posX), posY -1, ancho, largo,"left");
              }else if(direccion <= 1 && py && tablaJuego[posX][posY +1] != 3){

                 /// console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX, -(posY -1), ancho, largo,"rigth");
              }else return;
            }else if(direc == "rigth"){
              if(direccion <= 0.3 && px && tablaJuego[posX + 1][posY] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX + 1, posY, ancho, largo,"up");
              }else if(direccion <= 0.6 && nx && tablaJuego[posX][posY -1] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX, -(posY-1), ancho, largo,"left");
              }else if(direccion <= 1 && py && tablaJuego[posX][posY +1] != 3){

                  //console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY *3);
                  construccion(posX, posY +1, ancho, largo,"rigth");
              }else return;
            }
          }while(caminoEncontrado == false)
        //}
      }*/
      var salir = false;

      var repeticiones = 0;
      //construccion(0,0);

      function construccion(posX , posY){
          var direccion = Math.random();
          var desplazamiento = Math.random() * (5-1)-1;
          do{
            console.log("Intento: " + repeticiones);
            if(posX == lado - 2 && posY == lado-2){return;}//caso base
            //caso general
            if(direccion <= 0.25 && (posX + 1) <= (lado -2)){//arriba

                for(var i = 0;i <= desplazamiento; i++ ){ if((posX + i) < (lado -2) && tablaJuego[posX +i][posY] != 3){
                  tablaJuego[posX +i][posY] =3;suelo(posX * 3,p, posY *3);console.log("arriba");}}

                  construccion(posX +i, posY);

            }else if(direccion <= 0.5 && (posX -1) >= 0){//abajo

                for(var i = 0;i <= desplazamiento; i++ ){ if((posX - i) > 0 && tablaJuego[posX -i][posY] != 3){ 
                  tablaJuego[posX -i][posY] =3;suelo(posX * 3,p, posY *3);console.log("abajo");}}

                  construccion(posX - i, posY +i);

            }else if(direccion <= 0.75 && (posY -1) >= (lado -2)){//izquierda

                for(var i = 0;i <= desplazamiento; i++ ){ if((posY + i) < (lado -2) && tablaJuego[posX][posY + i] != 3){
                 
                  tablaJuego[posX][posY + i] =3;suelo(posX * 3,p, posY *3);console.log("izquierda");}}

                  construccion(posX, posY +i);

            }else if(direccion <=1 && (posY -1) >= 0){//derecha

                for(var i = 0;i <= desplazamiento; i++ ){ if((posY - i) > 0 && tablaJuego[posX][posY - i] != 3){ 
                 
                  tablaJuego[posX][posY - i] =3;suelo(posX * 3,p, posY *3);console.log("derecha");}}

                  construccion(posX, posY -i);

            }else if(repeticiones > 6){salir = true;}
            
            repeticiones ++;
          } while(salir == true)
        console.log("esta aqui");
      }
    }
  }
}
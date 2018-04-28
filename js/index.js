window.onload = function () { main()}

function main() {
  var mapa = document.querySelector('a-scene');
  var p = -0.4; //coordenada y del muro
  var direc = "";//ireccion a la que ira el camino
  /*
    Este metodo añade un cubo al mapa para construir el laberinto
    @param: x,y: coordenadas respectivas
  */

  function pared(x,y,z){
    var muro = document.createElement('a-box');         //creo el cubo que sera nuestro muro
    muro.setAttribute('geometry', {
      depth: 3,
      width: 3,
      height: 5
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

  laberinto(30,30); 

  /**metodo para dibujar el laberinto*/
  function laberinto(ancho, largo){
    //dibujo las paredes exteriores que limitaran el campo
    for(var i = 0;i < ancho;i++){pared(-3,0,i *3 - 3); pared(largo *3 - 3,0,i*3 - 3);} 
    for(var j = 0;j < largo;j++){pared(j *3-3,0,0 - 3); pared(j*3 - 3,0,ancho *3 - 3);} 

    dibujarMapa();
    function dibujarMapa(){
      //creo el array multidimensional del mapa
      var tablaJuego = new Array(ancho);

      for(var i= 0; i < ancho; i++){
        tablaJuego[i] = new Array(largo);
      }
      /*relleno el array con ceros para despues aplicar 
      el algoritmo del laberinto*/
      for (var i = 0; i < ancho; i++) {
        for(var j = 0; j < largo; j++){
          tablaJuego[i][j] = 0; 
        }
      }
      /*for(var i = 0; i < ancho; i++){
          for(var j = 0; j < largo; j++){
                pared(i - 1,0,j - 1);
          }
      }*/
      //construccion(0,0,30,30,"up");//inicio la funcio :)
      /*metodo recursivo que buscara y creara el laberinto
       @param: posX,posY se encargan de la posicion actual del metodo
       y @param ancho, alto: se encargan de la posicion final del metodo recursivo*/
      function construccion(posX, posY, ancho, largo, direc){
        //console.log("hola principio");
        var desplazamiento = Math.random() * (5-1)+1;//elijo un desplazamiento entre 1 y 5 bloques
        //console.log(desplazamiento + " esta aqui" + posX + " " + posY);
        if(posX >=ancho || posY >= largo){return 0;}
        //caso en que se disputara a boleo a donde ira
        else{ 
          var direccion = Math.random();//saco la variable a boleo
          //console.log("direccion " + direccion);
          var px = (posX <= ancho);//X positiva
          var nx = (posX >= 0);//X negativa
          var py = (posY <= largo);//Y positiva 
          var ny = (posY >=0);
          console.log( direccion);
          //direccion
          var caminoEncontrado = false;
          do{
            if(direc == "up"){
              if(direccion < 0.3 && px && tablaJuego[posX + 1][posY] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX*3 + 3, posY *3, ancho, largo,"up");
              }
              if(direccion < 0.6 && py && tablaJuego[posX][posY +1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3 , posY *3 +3, ancho, largo,"rigth");
              }
              if(direccion <= 1 && ny && tablaJuego[posX][posY -1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3, posY *3 -3, ancho, largo,"left");
              }
            }else if(direc == "down"){
              if(direccion < 0.3 && nx && tablaJuego[posX - 1][posY] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX*3 - 3, posY *3, ancho, largo,"down");
              }
              if(direccion < 0.6 && py && tablaJuego[posX][posY +1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3 , posY *3 +3, ancho, largo, "rigth");
              }
              if(direccion <= 1 && ny && tablaJuego[posX][posY -1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3, posY *3 -3, ancho, largo,"left");
              }
            }else if(direc == "left"){
              if(direccion < 0.3 && px && tablaJuego[posX + 1][posY] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX*3 + 3, posY *3, ancho, largo,"up");
              }
              if(direccion < 0.6 && nx && tablaJuego[posX][posY -1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3 , posY *3 -3, ancho, largo,"left");
              }
              if(direccion <= 1 && py && tablaJuego[posX][posY -1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3, posY *3 -3, ancho, largo,"rigth");
              }
            }else if(direc == "rigth"){
              if(direccion < 0.3 && px && tablaJuego[posX + 1][posY] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX*3 + 3, posY *3, ancho, largo,"up");
              }
              if(direccion < 0.6 && nx && tablaJuego[posX][posY -1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3 , posY *3 -3, ancho, largo,"left");
              }
              if(direccion <= 1 && py && tablaJuego[posX][posY +1] != 3){

                  console.log("hola" + direccion);
                  caminoEncontrado = true;
                  tablaJuego[posX][posY] = 3;
                  suelo(posX *3,p,posY*3);
                  construccion(posX *3, posY *3 +3, ancho, largo,"rigth");
              }
            }
          }while(caminoEncontrado == false)
        }
      }
    }
  }
}
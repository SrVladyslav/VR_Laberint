window.onload = function () { main()}

function main() {
  var mapa = document.querySelector('a-scene');

  var tablaJuego = new Array(10);

  for(var i= 0; i < 10; i++){
    tablaJuego[i] = i;
  }
  /*
  alert(""+tablaJuego[5]);*/
  /*
    Este metodo añade un cubo al mapa para construir el laberinto
    @param: x,y: coordenadas respectivas
  */

  function pared(x,y,z){
    var muro = document.createElement('a-box');         //creo el cubo que sera nuestro muro
    muro.setAttribute('geometry', {
      depth: 1,
      width: 1,
      height: 1
    });
    muro.setAttribute('position', {x: x,y: y,z: z});    //declaramos la posicion
    muro.setAttribute('shadow','cast','true');          //declaramos la sombra
    muro.setAttribute('material',{src:"assets/piedra.jpg"});
    mapa.appendChild(muro);                             //añado mi muro al mapa
  }
  laberinto(50,50); 

  function laberinto(ancho, largo){
    //dibujo las paredes exteriores que limitaran el campo
    for(var i = 0;i < ancho;i++){pared(-1,0,i - 1); pared(largo - 1,0,i - 1);} 
    for(var j = 0;j < largo;j++){pared(j-1,0,0 - 1); pared(j - 1,0,ancho - 1);} 
    //aplicando el algoritmo de generacion del laberinto
    for(var i = 1; i < ancho; i++){
        for(var j = 1; j < largo; j++){
            var dibujar = Math.random()* (1 - 0) + 0;
            if(dibujar >= 0.5){
              pared(i - 1,0,j - 1);
            }
        }
    }
  }
}
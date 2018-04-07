window.onload = function () { main() }

function main() {
  var sceneEl = document.querySelector('a-scene');

  /*
    This method adds a box to the scene in the scene
    declared in the html
  */
  function add_box(x,y,z){
    var sphere = document.createElement('a-box');
    sphere.setAttribute('geometry', {
      depth: 1,
      width: 1,
      height: 1
    });
    sphere.setAttribute('position', {x: x, y: y, z: z});
    sphere.setAttribute('material', 'color', 'red');
    sphere.setAttribute('shadow','cast','true');
    sceneEl.appendChild(sphere);
  }

  add_box(2,2,2);
}
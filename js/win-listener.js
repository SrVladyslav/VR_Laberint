AFRAME.registerComponent('win-listener', {
  schema: {
    x: {type: 'number'},
    z: {type: 'number'}
  },
  init: function () {
  	console.log('A buscar!');
  },
  tick: function() {
  	var data = this.data;
    var position = this.el.getAttribute('position');
    //console.log(position);
    if (Math.abs(data.x-position.x) < 3 && Math.abs(data.z-position.z) < 3) {
      window.location.replace("fin.html");
    }
  }
});
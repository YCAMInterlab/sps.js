var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;
var gaussian = require('mhf').gaussian;

var tmp = vec3.create();

function Attractor() {
  this.pos = vec3.create();
  this.fallOff = 0.5;
};

Attractor.prototype = new Behavior();
Attractor.prototype.constructor = Attractor;

Attractor.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  vec3.subtract( tmp, this.pos, pos );
  var length = vec3.length( tmp );
  var env = gaussian( length, this.magnitude * dt, 0.0, this.fallOff );
  vec3.scaleAndAdd( acc, acc, tmp, env );
};

module.exports = Attractor;

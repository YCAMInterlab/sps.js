var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;

var tmp = vec3.create();

function Homing() { };

Homing.prototype = new Behavior();
Homing.prototype.constructor = Homing;

Homing.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  vec3.subtract( tmp, particle.getHome(), pos );
  vec3.scaleAndAdd( acc, acc, tmp, this.magnitude * dt );
};

module.exports = Homing;

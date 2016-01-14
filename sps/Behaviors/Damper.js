var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;

function Damper() { };

Damper.prototype = new Behavior();
Damper.prototype.constructor = Damper;

Damper.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  vec3.scaleAndAdd( acc, acc, vel, - this.magnitude * dt );
};

module.exports = Damper;

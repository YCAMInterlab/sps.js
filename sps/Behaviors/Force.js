var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;

function Force( options ) {
  options = options ? options : {};
  this.force = options.force ? options.force : vec3.fromValues( 0.0, -1.0, 0.0 );
};

Force.prototype = new Behavior();
Force.prototype.constructor = Force;

Force.prototype.actUpon = function( particle, pos, vel, acc, dt ) {

  vec3.scaleAndAdd( acc, acc, this.force, this.magnitude * dt );
};

module.exports = Force;

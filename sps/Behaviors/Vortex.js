var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;
var gaussian = require('mhf').gaussian;

var sp = vec3.create();
var ptOnWire = vec3.create();
var rv = vec3.create();
var rvn = vec3.create();
var f = vec3.create();

function Vortex() {
  this.startPt = vec3.fromValues( 0, 0, 1 );
  this.endPt = vec3.fromValues( 0, 0, -1 );
  this.se = vec3.create();
  this.sen = vec3.create();
  this.fallOff = 1.0;
  this.magnitude = 0.1;
};

Vortex.prototype = new Behavior();
Vortex.prototype.constructor = Vortex;

Vortex.prototype.update = function() {
  vec3.subtract( this.se, this.startPt, this.endPt );
  vec3.normalize( this.sen, this.se );
};

Vortex.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  var startPt = this.startPt;
  var se = this.se;
  var sen = this.sen;

  vec3.subtract( sp, startPt, pos );
  var length = vec3.dot( sp, sen );
  vec3.subtract( ptOnWire, startPt, sen );
  vec3.scale( ptOnWire, ptOnWire, length );
  vec3.subtract( rv, pos, ptOnWire );
  var rvLength = vec3.length( rv );
  vec3.cross( f, rv, se );
  var env = gaussian( rvLength, this.magnitude, 0.0, this.fallOff );
  vec3.scaleAndAdd( acc, acc, f, env * dt );
};

module.exports = Vortex;

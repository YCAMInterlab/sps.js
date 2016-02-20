var Behavior = require('./Behavior');
var mhf = require('./../../../mhf');
var map = mhf.map;

var EPSILON = require('gl-matrix').glMatrix.EPSILON
var vec3 = require('gl-matrix').vec3;
var quat = require('gl-matrix').quat;

var c0 = vec3.create();
var d0 = vec3.create();
var c0p2 = vec3.create();
var c0p3 = vec3.create();
var c0p2xy = vec3.create();
var c0p3xy = vec3.create();
var cx = vec3.create();
var angle = 0.0;
var delta = 0.0;
var other = false;
var zAxis = vec3.fromValues( 0.0, 0.0, 1.0 );

function r2d(r) {
  return ( r * 180.0 ) / Math.PI;
}
function Angles() { };

Angles.prototype = new Behavior();
Angles.prototype.constructor = Angles;

Angles.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  var Angles = particle.getAngles();
  var slen = Angles.length;
  for( var i = 0; i < slen; i++ ) {
    var s = Angles[ i ];
    other = s.p2 === particle ? true : false;

    // center
    vec3.add( c0, s.p0.getPrevPos(), s.p1.getPrevPos() );
    vec3.scale( c0, c0, 0.5 );

    // axis
    vec3.sub( d0, s.p0.getPrevPos(), s.p1.getPrevPos() );
    vec3.normalize( d0, d0 );

    // vectors
    vec3.subtract( c0p2, s.p2.getPrevPos(), c0 );
    vec3.subtract( c0p3, s.p3.getPrevPos(), c0 );
    vec3.normalize( c0p2, c0p2 );
    vec3.normalize( c0p3, c0p3 );

    var ori = quat.create();
    quat.rotationTo( ori, d0, zAxis );

    vec3.transformQuat( c0p2xy, c0p2, ori );
    vec3.transformQuat( c0p3xy, c0p3, ori );

    var a = Math.atan2( c0p2xy[ 1 ], c0p2xy[ 0 ] );
    if( a < 0 ) {
      a = map( a, -Math.PI, 0.0, Math.PI, Math.PI * 2.0 );
    }

    var b = Math.atan2( c0p3xy[ 1 ], c0p3xy[ 0 ] );
    if( b < 0 ) {
      b = map( b, -Math.PI, 0.0, Math.PI, Math.PI * 2.0 );
    }

    if( a < b ) {
      angle = b - a;
    }
    else {
      angle = Math.PI * 2 - ( a - b );
    }

    delta = ( angle - s.angle );
    vec3.cross( cx, c0p2, c0p3 );
    if( Math.abs( delta ) > EPSILON ) {
    // if( Math.abs( delta ) > EPSILON && other ) {
    // if( Math.abs( delta ) > EPSILON ) {

      vec3.cross( cx, d0, other ? c0p2 : c0p3 );
      vec3.scaleAndAdd( acc, acc, cx, ( other ? ( 1.0 - s.bias ) : - ( s.bias ) ) * s.k * delta * this.magnitude * dt / slen );
    }
  }
};

module.exports = Angles;

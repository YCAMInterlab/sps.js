var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;

var c0 = vec3.create();
var d0 = vec3.create();
var c0p2 = vec3.create();
var c0p3 = vec3.create();
var cx = vec3.create();
var angle = 0.0;
var delta = 0.0;
var other = false;

function Angles() { };

Angles.prototype = new Behavior();
Angles.prototype.constructor = Angles;

Angles.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  var Angles = particle.getAngles();
  var slen = Angles.length;
  for( var i = 0; i < slen; i++ ) {
    var s = Angles[ i ];
    // var other = s.p2 === particle ? s.p2 : s.p3;
    other = s.p2 === particle ? true : false;
    vec3.add( c0, s.p0.getPrevPos(), s.p1.getPrevPos() );
    vec3.scale( c0, c0, 0.5 );

    vec3.subtract( c0p2, s.p2.getPrevPos(), c0 );
    vec3.subtract( c0p3, s.p3.getPrevPos(), c0 );
    vec3.normalize( c0p2, c0p2 );
    vec3.normalize( c0p3, c0p3 );

    vec3.sub( d0, s.p0.getPrevPos(), s.p1.getPrevPos() );
    vec3.normalize( d0, d0 );

    vec3.cross( cx, c0p2, c0p3 );
    var c = vec3.length( cx );
    var d = vec3.dot( c0p2, c0p3 );
    angle = Math.atan2( c, d );

    delta = ( s.angle - angle ) * ( vec3.dot( cx, d0 ) > 0 ? 1.0 : -1.0 );

    vec3.cross( cx, d0, other ? c0p2 : c0p3 );
    vec3.scaleAndAdd( acc, acc, cx, ( other ? -1.0 : 1.0 ) * s.k * delta * this.magnitude * dt / slen );
  }
};

module.exports = Angles;

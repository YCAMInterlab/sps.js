var Behavior = require('./Behavior');
var vec3 = require('gl-matrix').vec3;

var tmp = vec3.create();

function Springs() { };

Springs.prototype = new Behavior();
Springs.prototype.constructor = Springs;

Springs.prototype.actUpon = function( particle, pos, vel, acc, dt ) {
  var springs = particle.getSprings();
  var slen = springs.length;
  for( var i = 0; i < slen; i++ ) {
    var s = springs[ i ];
    var other = s.p0 === particle ? s.p1 : s.p0;
    vec3.subtract( tmp, particle.getPos(), other.getPos() );
    var dist = vec3.length( tmp );
    vec3.normalize( tmp, tmp );
    var delta = s.length - dist;
    vec3.scale( tmp, tmp, s.k * delta * this.magnitude * dt );
    vec3.add( acc, acc, tmp );
  }
};

module.exports = Springs;

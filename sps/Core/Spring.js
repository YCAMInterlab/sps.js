var vec3 = require('gl-matrix').vec3;

var tmp = vec3.create();

function Spring( particle0, particle1, opts ) {
  opts = opts ? opts : {};
  this.p0 = particle0;
  this.p1 = particle1;
  this.k = opts.k != undefined ? opts.k : 1.0;
  this.length = 0.0;
  if( opts.length != undefined ) {
    this.length = opts.length;
  }
  else {
    vec3.subtract( tmp, this.p0.getPos(), this.p1.getPos() );
    this.length = vec3.length( tmp );
  }
  particle0.addSpring( this );
  particle1.addSpring( this );
};

module.exports = Spring;

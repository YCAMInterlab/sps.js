var vec3 = require('gl-matrix').vec3;

var tmp = vec3.create();

function Spring( particle0, particle1, opts ) {
  opts = opts ? opts : {};
  this.p0 = particle0;
  this.p1 = particle1;
  this.k = opts.k != undefined ? opts.k : 1.0;
  this.length = opts.length != undefined ? opts.length : 1.0;
  particle0.addSpring( this );
  particle1.addSpring( this );
};

module.exports = Spring;

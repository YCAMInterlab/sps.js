var vec3 = require('gl-matrix').vec3;

function Derivative() {
   this.dpdt = vec3.create();
   this.dvdt = vec3.create();
};

module.exports = Derivative;

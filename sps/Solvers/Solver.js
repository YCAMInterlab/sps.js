var vec3 = require('gl-matrix').vec3;
var limit = require('mhf').limit3;

function Solver() {
};

Solver.prototype.update = function( particle, behaviors, physics ) {

};

Solver.prototype.calculateAcceleration = function( particle, pos, vel, acc, physics, behaviors ) {
  var blen = behaviors.length;
  for( var i = 0; i < blen; i++ ) {
      var b = behaviors[ i ];
      if( b.getEnabled() ) {
          b.actUpon( particle, pos, vel, acc, physics.dt );
      }
  }
  limit( acc, acc, physics.accLimit );
};

module.exports = Solver;

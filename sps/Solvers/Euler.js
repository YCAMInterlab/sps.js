var Solver = require('./Solver');
var vec3 = require('gl-matrix').vec3;
var limit = require('mhf').limit3;

function Euler() {

};

Euler.prototype = new Solver();
Euler.prototype.constructor = Euler;

Euler.prototype.update = function( particle, behaviors, physics ) {
  if( particle.getFixed() ) {
    return;
  }

  var ppos = particle.getPrevPos();
  var pos = particle.getPos();
  var vel = particle.getVel();
  var acc = particle.getAcc();
  vec3.copy( ppos, pos );

  this.calculateAcceleration( particle, pos, vel, acc, physics, behaviors );
  limit( vel, vel, physics.velLimit );
  vec3.add( vel, vel, acc );
  vec3.add( pos, pos, vel );
  vec3.set( acc, 0, 0, 0 );
};

module.exports = Euler;

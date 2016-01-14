var Solver = require('./Solver');
var vec3 = require('gl-matrix').vec3;
var limit = require('mhf').limit3;

function Verlet() {

};

Verlet.prototype = new Solver();
Verlet.prototype.constructor = Verlet;

Verlet.prototype.update = function( particle, behaviors, physics ) {
  if( particle.getFixed() ) {
    return;
  }

  var dt = physics.dt;
  var ppos = particle.getPrevPos();
  var pos = particle.getPos();
  var vel = particle.getVel();
  var acc = particle.getAcc();
  vec3.copy( ppos, pos );

  vec3.subtract( vel, pos, ppos );
  this.calculateAcceleration( particle, pos, vel, acc, physics, behaviors );
  vec3.add( vel, vel, acc );
  limit( vel, vel, physics.velLimit );
  vec3.add( pos, pos, vel );
  vec3.set( acc, 0, 0, 0 );
};

module.exports = Verlet;

var Solver = require('./Solver.js');
var vec3 = require('gl-matrix').vec3;
var Derivative = require('./Derivative');
var limit = require('mhf').limit3;

var tmpPos = vec3.create();
var tmpVel = vec3.create();
var tmpAcc = vec3.create();

function RungeKutta() {
  this.zero = new Derivative();
  this.one = new Derivative();
  this.two = new Derivative();
  this.three = new Derivative();
  this.four = new Derivative();
};

RungeKutta.prototype = new Solver();
RungeKutta.prototype.constructor = RungeKutta;

RungeKutta.prototype.evaluate = function( out, input, particle, pos, vel, acc, dt, physics, behaviors ) {
  vec3.scaleAndAdd( tmpPos, pos, input.dpdt, dt );
  vec3.scaleAndAdd( tmpVel, vel, input.dvdt, dt );

  this.calculateAcceleration( particle, tmpPos, tmpVel, acc, physics, behaviors );
  limit( tmpVel, tmpVel, physics.velLimit );

  vec3.copy( out.dpdt, tmpVel );
  vec3.copy( out.dvdt, acc );
};

RungeKutta.prototype.update = function( particle, behaviors, physics ) {
  if( particle.getFixed() ) {
    return;
  }

  var zero = this.zero;
  var one = this.one;
  var two = this.two;
  var three = this.three;
  var four = this.four;

  var dt = physics.dt;
  var dt2 = dt * 0.5;
  var dt6 = dt / 6.0;

  var ppos = particle.getPrevPos();
  var pos = particle.getPos();
  var vel = particle.getVel();
  var acc = particle.getAcc();
  vec3.copy( ppos, pos );

  vec3.set( tmpAcc, 0, 0, 0 );
  this.evaluate( one, zero, particle, pos, vel, tmpAcc, 0.0, physics, behaviors );
  vec3.set( tmpAcc, 0, 0, 0 );
  this.evaluate( two, one, particle, pos, vel, tmpAcc, dt2, physics, behaviors );
  vec3.set( tmpAcc, 0, 0, 0 );
  this.evaluate( three, two, particle, pos, vel, tmpAcc, dt2, physics, behaviors );
  vec3.set( tmpAcc, 0, 0, 0 );
  this.evaluate( four, three, particle, pos, vel, tmpAcc, dt, physics, behaviors );

  vec3.copy( tmpPos, two.dpdt );
  vec3.add( tmpPos, tmpPos, three.dpdt );
  vec3.scale( tmpPos, tmpPos, 2.0 );
  vec3.add( tmpPos, tmpPos, one.dpdt );
  vec3.add( tmpPos, tmpPos, four.dpdt );
  vec3.scaleAndAdd( pos, pos, tmpPos, dt6 );

  vec3.copy( tmpVel, two.dvdt );
  vec3.add( tmpVel, tmpVel, three.dvdt );
  vec3.scale( tmpVel, tmpVel, 2.0 );
  vec3.add( tmpVel, tmpVel, one.dvdt );
  vec3.add( tmpVel, tmpVel, four.dvdt );
  vec3.scaleAndAdd( vel, vel, tmpVel, dt6 );
  limit( vel, vel, physics.velLimit );
};

module.exports = RungeKutta;

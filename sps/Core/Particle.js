var vec3 = require('gl-matrix').vec3;

function Particle() {
  this.index = -1;
  this.fixed = false;
  this.home = vec3.create();
  this.pos = vec3.create();
  this.ppos = vec3.create();
  this.vel = vec3.create();
  this.acc = vec3.create();
  this.springs = [];
  this.angles = [];
};

Particle.prototype.setIndex = function( index ) {
  this.index = index;
};

Particle.prototype.setIndex = function() {
  return this.index;
};

Particle.prototype.getFixed = function() {
  return this.fixed;
};

Particle.prototype.getFixed = function() {
  return this.fixed;
};

Particle.prototype.setFixed = function( fixed ) {
  this.fixed = fixed;
};

Particle.prototype.setHome = function( home ) {
  vec3.copy( this.home, home );
};

Particle.prototype.getHome = function() {
  return this.home;
};

Particle.prototype.setPos = function( pos ) {
  vec3.copy( this.pos, pos );
};

Particle.prototype.getPos = function() {
  return this.pos;
};

Particle.prototype.setPrevPos = function( ppos ) {
  vec3.copy( this.ppos, ppos );
};

Particle.prototype.getPrevPos = function() {
  return this.ppos;
};

Particle.prototype.setVel = function( vel ) {
  vec3.copy( this.vel, vel );
};

Particle.prototype.getVel = function() {
  return this.vel;
};

Particle.prototype.setAcc = function( acc ) {
  vec3.copy( this.acc, acc );
};

Particle.prototype.getAcc = function() {
  return this.acc;
};

Particle.prototype.addForce = function( force ) {
  var acc = this.acc;
  vec3.add( acc, acc, force );
};

Particle.prototype.addSpring = function( spring ) {
  this.springs.push( spring );
};

Particle.prototype.getSprings = function() {
  return this.springs;
};

Particle.prototype.addAngle = function( angle ) {
  this.angles.push( angle );
};

Particle.prototype.getAngles = function() {
  return this.angles;
};

module.exports = Particle;

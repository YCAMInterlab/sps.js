function Physics( opts ) {
  opts = opts ? opts : {};
  this.dt = opts.dt ? opts.dt : 0.25;
  this.accLimit = opts.accLimit ? opts.accLimit : 1.5;
  this.velLimit = opts.velLimit ? opts.velLimit : 2.75;
};

Physics.prototype.getDt = function() {
  return this.dt;
};

Physics.prototype.getAccLimit = function() {
  return this.accLimit;
};

Physics.prototype.getVelLimit = function() {
  return this.velLimit;
};

module.exports = Physics;

function Physics( opts ) {
  opts = opts ? opts : {};
  this.dt = opts.dt != undefined ? opts.dt : 0.25;
  this.accLimit = opts.accLimit != undefined ? opts.accLimit : 1.5;
  this.velLimit = opts.velLimit != undefined ? opts.velLimit : 2.75;
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

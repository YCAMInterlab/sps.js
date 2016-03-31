## Spring Particle Systems in Javascript

## Synopsis
sps.js is a minimal & modular library for simulating particles on the cpu. In addition to core elements, like particles, springs, angular springs, it provides extensible behaviors aka "forces" (vortex, attraction, homing, etc), and physics solvers (Euler, Runge Kutta, and Verlet).

## Code Example
Creating a particle system is as simple as:

```js
var sps = require('sps');
var ParticleSystem = sps.ParticleSystem;
var Particle = sps.Particle;

var ps = new ParticleSystem();

for( var i = 0; i < 1000; i++ ) {
    var pos = [
      Math.random() * 2.0 - 1.0,
      Math.random() * 2.0 - 1.0,
      Math.random() * 2.0 - 1.0
    ];    
    var particle = ps.addParticle();
    particle.setPos( pos );     
}
```

To update the particle system we created above:

```js

function update() {
  ps.update();
}
```

By default, there are no "behaviors" on the particle system. You can add some to the particle system by:

```js
var sps = require("sps");

var homing = new sps.HomingBehavior();
homing.magnitude = 0.75;
ps.addBehavior( homing );

var damper = new sps.DamperBehavior();
damper.magnitude = 0.9;
ps.addBehavior( damper );

var attractor = new sps.AttractorBehavior();
attractor.magnitude = 2.0;
attractor.fallOff = 1.0;
ps.addBehavior( attractor );
```

To add a spring between two particles in the system:
```js
var particles = ps.getParticles();
var p0 = particles[ 0 ];
var p1 = particles[ 1 ];
var s0 = new Spring( p0, p1, { length: 1, k: 2 } );
```
Note that you don't have to manage the spring. Internally the spring calls "addSpring" on the particle and gets attached to the particle.

## Motivation
This library is part of a larger project / series of libraries that aspires to bring computational and parametric design to the web. This library aspires to be the particle simulation engine that enables all types of generative / computational design applications. My hope is that this library enables higher level computational design, form generation for 3d printing, cnc milling and laser cutting. 

## Build Requirements
node.js (4.4.0+) & npm

## Installation
You can add this library to your project by running:
```
npm install --save https://github.com/YCAMInterlab/sps.js.git
```

or via npm:
```
npm install --save sps
```

## Examples
See https://github.com/rezaali/webgl-sketches/tree/master/springs

## Contribution
Copyright 2015-2016 [Reza Ali](http://www.syedrezaali.com) co-developed by [YCAMInterLab](http://interlab.ycam.jp/en/) during the [Guest Research Project v.3](http://interlab.ycam.jp/en/projects/guestresearch/vol3)

## License
Apache-2.0

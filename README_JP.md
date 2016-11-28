## Spring Particle Systems in Javascript

## Synopsis
sps.jsは、cpu上でのパーティクル シミュレーションのためのミニマルなモジュラーライブラリです。パーティクルやスプリング、角度スプリングといった核心要素の他に、渦巻き、アトラクション、ホーミングなどの拡張可能な動作（フォース）と物理ソルバー (オイラー法、ルンゲ＝クッタ法、ベレの方法)を備えています。

## Code Example
パーティクル系を作る工程はシンプルです:

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

上記のように作ったパーティクル系は、以下の方法で更新できます:

```js

function update() {
  ps.update();
}
```

デフォルト設定では、パーティクル系に動作（フォース）はありませんが、以下のような手順で追加できます:

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

パーティクルの間にスプリングの追加は、以下の手順で行います:
```js
var particles = ps.getParticles();
var p0 = particles[ 0 ];
var p1 = particles[ 1 ];
var s0 = new Spring( p0, p1, { length: 1, k: 2 } );
```
スプリングを管理する必要はありません。スプリングはパーティクル上に"addSpring"を呼び出し、パーティクルに添付されます。

## Motivation
このライブラリは、コンピュテーショナル デザイン、及びパラメトリック デザインをウェブに広めようとする、大きなライブラリのプロジェクト/シリーズの一部です。
高度なコンピューテーショナル デザインや3Dモデルの出力、Gコード生成、CNCフライス加工ツール用のパスや、レーザー切断用のパスの生成、ロボット運動計画などを可能にする、全ての複雑な形態機能を備えた数学的頭脳になることを目的としています。

## Build Requirements
node.js (4.4.0+) & npm

## Installation
このライブラリをプロジェクトに追加するためには、以下の操作を行って下さい:
```
npm install --save https://github.com/YCAMInterlab/sps.js.git
```

もしく以下の方法でも追加できます:
```
npm install --save sps
```

## Examples
See https://github.com/rezaali/webgl-sketches/tree/master/springs

## Contribution
Copyright 2015-2016 [Reza Ali](http://www.syedrezaali.com) co-developed by [YCAMInterLab](http://interlab.ycam.jp/en/) during the [Guest Research Project v.3](http://interlab.ycam.jp/en/projects/guestresearch/vol3)

## License
Apache-2.0

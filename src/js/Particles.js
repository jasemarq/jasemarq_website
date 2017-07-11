/**
New Particles based on invention by Simo Santavirta @simppafi
http://www.simppa.fi/blog/the-new-particle/
Also inspired by The Spirit created by @edankwan
https://github.com/edankwan/The-Spirit
**/

import { BufferGeometry, BufferAttribute, MeshBasicMaterial,
Mesh } from 'three';

const particles = {

  angle: '',
  count: '',
  init: '',
  final: '',
  angles: '',
  geometry: '',
  material: '',
  mesh: '',

  particle(scene) {

    var _scene = scene;

    var that = this;
    var PI = Math.PI;

    // Define angles.
    that.angle = PI * 2 / 3;

    // Define count. Can update later. (Choose experience.)
    that.count = 1;

    // Vertex data (init 1st stage, final 2nd stage)
    that.init = new Float32Array(that.count * 3 * 3);
    that.final = new Float32Array(that.count * 3 * 3);

    that.angles = [

      [Math.sin(that.angle * 2 + PI), Math.cos(that.angle * 2 + PI), 0], // Init Vertice # 1
      [Math.sin(that.angle + PI), Math.cos(that.angle + PI), 0], // Init Vertice # 2
      [Math.sin(that.angle * 3 + PI), Math.cos(that.angle * 3 + PI), 0], // Init Vertice # 3

      [Math.sin(that.angle * 2), Math.cos(that.angle * 2), 0], // Final Vertice # 1
      [Math.sin(that.angle), Math.cos(that.angle), 0], // Final Vertice # 2
      [Math.sin(that.angle * 3), Math.cos(that.angle * 3), 0] // Final Vertice # 3
    ]

    for(var i = 0; i < that.count; i++) {

      that.init[0] = that.angles[0][0];
      that.init[1] = that.angles[0][1];
      that.init[2] = that.angles[0][2];
      that.init[3] = that.angles[1][0];
      that.init[4] = that.angles[1][1];
      that.init[5] = that.angles[1][2];
      that.init[6] = that.angles[2][0];
      that.init[7] = that.angles[2][1];
      that.init[8] = that.angles[2][2];

      that.final[0] = that.angles[3][0];
      that.final[1] = that.angles[3][1];
      that.final[2] = that.angles[3][2];
      that.final[3] = that.angles[4][0];
      that.final[4] = that.angles[4][1];
      that.final[5] = that.angles[4][2];
      that.final[6] = that.angles[5][0];
      that.final[7] = that.angles[5][1];
      that.final[8] = that.angles[5][2];

    }

    that.geometry = new BufferGeometry();

    that.geometry.addAttribute( 'position', new BufferAttribute( that.init, 3 ));
    that.geometry.addAttribute( 'positionFlip', new BufferAttribute( that.final, 3 ));
    that.material = new MeshBasicMaterial( { color: 0xff0000 });
    that.mesh = new Mesh( that.geometry, that.material );
    console.log('particle created!!');
    return that.mesh;


  }
}

let Particle = function Particle() {
  return Object.assign(Object.create(particles), {});
};

let PARTICLE = Particle();

module.exports = PARTICLE;

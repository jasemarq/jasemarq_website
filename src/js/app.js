let $ = require('jquery');
const http = require('http');
const APP = require('./Background.js');

APP.init();


/*
import { Scene, Renderer, PerspectiveCamera, VideoTexture,
WebGLRenderer, LinearFilter } from 'three';

import { RenderPass, EffectComposer } from 'postprocessing';

const Detector = require('detector-webgl');



let main = {

  scene: '',
  camera: '',
  renderer: '',
  container: '',
  video: '',
  texture: '',
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  renderModel: '',
  composer: '',

  defineRenderer() {


    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor( 0x111111, 1.0 );
    this.renderer.setSize( this.windowWidth, this.windowHeight );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.shadowMap.enabled = true;
    this.renderer.autoClear = false;
  },

  defineCamera() {

    this.camera = new PerspectiveCamera(45, this.windowWidth / this.windowHeight, 0.1, 1000 );
    this.camera.position.z = 450;

  },

  defineVideo() {

    this.video = document.getElementById( 'video' );
    this.texture = VideoTexture( this.video );
    this.texture.minFilter, this.texture.magFilter = LinearFilter;

  },

  definePlane() {

  },

  init() {

    // Determine if WebGL enabled.

    if ( Detector == false ) { alert("Need WebGL"); } // Can put interesting static page here.

    else {

    this.container = document.createElement( 'div' );
    document.body.appendChild( this.container );

    // Create and Define Renderer

    this.defineRenderer();

    // Create and Define Camera

    this.defineCamera();

    // Create new Scene
    this.scene = new Scene;

    // postprocessing

    this.renderModel = new RenderPass( this.scene, this.camera );

    this.composer = new EffectComposer( this.renderer );

    this.composer.addPass ( this.renderModel );

    // Listen for window resizing (Need to also detect for landscape mode.)
    window.addEventListener( 'resize' , this.onWindowResize, false);

    $('body').append("<h1>This works</h1>")

    }
  },

  // Cannot read properties. Binding?
  onWindowResize() {

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.camera.aspect = this.windowWidth / this.windowHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize.bind(this.renderer) ( this.windowWidth / this.windowHeight );
    this.composer.reset();
  },

  render() {

    this.renderer.clear();
    this.composer.render();

  },

  animate() {

    requestAnimationFrame( this.animate );
    this.render();

  }
}

let Main = function Main() {
  return Object.assign(Object.create(main), {});
};

let MAIN = Main();
*/

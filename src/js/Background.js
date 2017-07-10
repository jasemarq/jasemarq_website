let $ = require('jquery');
const http = require('http');

import { Scene, Renderer, PerspectiveCamera, VideoTexture,
WebGLRenderer, LinearFilter, PlaneGeometry, MeshBasicMaterial,
Mesh, AxisHelper, BoxGeometry, LoadingManager, ImageLoader } from 'three';

import { RenderPass, EffectComposer, GlitchPass } from 'postprocessing';

const Detector = require('detector-webgl');

let main = {

  scene: '',
  camera: '',
  renderer: '',
  container: '',
  video: '',
  texture: '',
  renderModel: '',
  composer: '',
  plane: '',
  movieMaterial: '',
  movieScreen: '',
  axes: '',
  videoImage:'',
  composer:'',
  time:'',

  defineRenderer() {

    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor( 0x111111, 1.0 );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.shadowMap.enabled = true;
    this.renderer.autoClear = false;
    document.body.appendChild( this.renderer.domElement );
    console.log("renderer created");
  },

  defineCamera() {

    this.camera = new PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000 )
    console.log("camera created");
    this.camera.lookAt( this.scene.position );

  },

  defineVideo() { // Creates video texture.

    this.video = document.getElementById( 'video' );
    this.video.src = ("./src/video/jasemarqbk.mov");
    this.video.load();
    this.video.play();

    this.videoImage = document.createElement( 'canvas' );
	  this.videoImage.width = window.innerWidth;
	  this.videoImage.height = window.innerHeight;
    this.texture = new VideoTexture( this.video );
    this.texture.minFilter = LinearFilter;
    this.texture.magFilter = LinearFilter;
    console.log("video created");

  },

  pauseVideo() {
    if(this.video.paused == false) {
    this.video.pause();
    console.log(vid.paused);
    }
  },

  playVideo() {
    if(this.video.paused == true) {
      this.video.play();
      console.log(vid.paused);
    }
  },

  definePlane() { //  Creates plane & applies video texture to screen.

    this.plane = new PlaneGeometry( 75, 37.5, 5, 4 );
    this.movieMaterial = new MeshBasicMaterial( { map: this.texture, overdraw: true } );
    this.movieScreen = new Mesh( this.plane, this.movieMaterial );
    this.scene.add( this.movieScreen );
    console.log("plane defined");
	  this.camera.lookAt(this.movieScreen.position);

  },

  init() {

      // Well that's helpful.
      var that = this;

      if ( Detector == false ) { alert("Need WebGL"); } // Can put interesting static page here.

      else {

      /*
      // Progress Bar
      var progress = document.createElement('div');
      progress.setAttribute("id", "progress");

      var progressBar = document.createElement('div');
      progressBar.setAttribute("id", "prograssBar");

      progress.appendChild(progressBar);
      document.body.appendChild(progress);

      var manager = new LoadingManager();
      manager.onProgress = function ( item, loaded, total ) {
        progressBar.style.width = (loaded / total * 100) + '%';
  };

  function addRandomPlaceHoldItImage(){
    var r = Math.round(Math.random() * 4000);
    new ImageLoader(manager).load('http://placehold.it/' + r + 'x' + r);
  }

  for(var i = 0; i < 10; i++) addRandomPlaceHoldItImage();

  */

      that.scene = new Scene();

      that.defineCamera();
      that.camera.position.z = 5;

	//	that.camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      that.defineRenderer();

      // Cannot add video texture to plane.
      that.defineVideo();
      that.definePlane();

      that.composer = new EffectComposer( that.renderer );
      that.composer.addPass( new RenderPass ( that.scene, that.camera ));
      var glitchPass = new GlitchPass();
      glitchPass.renderToScreen = true;
      that.composer.addPass( glitchPass );

    //  that.axes = new AxisHelper(1000);
    //  that.scene.add(that.axes);

    // still not working
      var onWindowResize = function () {

        that.camera.aspect = window.innerWidth / window.innerHeight;
        that.camera.updateProjectionMatrix();
        that.renderer.setSize( window.innerWidth, window.innerHeight );

    //    that.pauseVideo();

        /*
          window.innerWidth = window.innerWidth;
          window.innerHeight = window.innerHeight;

          that.camera.aspect = window.innerWidth / window.innerHeight;

          that.camera.updateProjectionMatrix();

          that.renderer.setSize( window.innerWidth / window.innerHeight );
          that.renderer.render(that.scene, that.camera); */

        }
      }

      var animate = function () {
			requestAnimationFrame( animate );
      that.time = Date.now();
      that.composer.render();
//			that.renderer.render(that.scene, that.camera);
			};

			animate();
      window.addEventListener( 'resize' , onWindowResize(), false);

    }

    // Determine if WebGL enabled.
    /*
    if ( Detector == false ) { alert("Need WebGL"); } // Can put interesting static page here.

    else {

    // Create new Scene
    that.scene = new Scene;

    that.container = document.createElement( 'div' );
    document.body.appendChild( that.container );

    // Create and Define Renderer

    that.defineRenderer();

    // Create and Define Camera

    that.defineCamera();

    that.axes = new AxisHelper(1000);
    that.scene.add(that.axes);

    that.defineVideo();
    that.definePlane();

    // postprocessing

    that.renderModel = new RenderPass( that.scene, that.camera );

    that.composer = new EffectComposer( that.renderer );

    that.composer.addPass ( that.renderModel );

    // Listen for window resizing (Need to also detect for landscape mode.)
    window.addEventListener( 'resize' , that.onWindowResize(), false);

    $('body').append("<h1>This works</h1>")

  }
  },

  // Cannot read properties. Binding?
  onWindowResize() {


    window.innerWidth = window.innerWidth;
    window.innerHeight = window.innerHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize.bind(this.renderer) ( window.innerWidth / window.innerHeight );
    this.composer.reset();
  },

  render() {

    this.composer.render();

  },

  animate() {

    requestAnimationFrame( this.animate );
    this.render();

  } */
}

let Main = function Main() {
  return Object.assign(Object.create(main), {});
};

let MAIN = Main();

module.exports = MAIN;

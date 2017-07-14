let $ = require('jquery');
const http = require('http');
import css from '../scss/Three.scss';

const NAVIGATION = require('./Navigation.js');
const PARTICLE = require('./Particles.js');

import { Scene, Renderer, PerspectiveCamera, VideoTexture,
WebGLRenderer, LinearFilter, PlaneGeometry, MeshBasicMaterial,
Mesh, MeshLambertMaterial, AxisHelper, BoxGeometry,
LoadingManager, ImageLoader, BufferGeometry, BufferAttribute,
AmbientLight, GridHelper, DirectionalLight, DirectionalLightHelper,
SpotLight } from 'three';

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
  loadScene: '',
  loadCamera: '',
  loadBox: '',
  resources_loaded: true, // LOADING FUNCTION, SEPARATE LOGIC
  loadingManager: '',

  // LOADING SCREEN LOGIC
  loadingScreen() {

    this.loadScene = new Scene();
    this.loadCamera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    this.loadBox = new Mesh(
    new BoxGeometry( 0.5, 0.5, 0.5 ),
    new MeshBasicMaterial( { color: 0x444ff })
    )

    this.loadBox.position.set(0, 0, 5);
    this.loadCamera.lookAt(this.loadBox.position);
    this.loadScene.add(this.loadBox);

  },

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

    this.plane = new PlaneGeometry( 45, 22.25, 0, 0);
    this.movieMaterial = new MeshLambertMaterial( { map: this.texture, overdraw: true } );
    this.movieScreen = new Mesh( this.plane, this.movieMaterial );
    this.scene.add( this.movieScreen );
    console.log("plane defined");
	  this.camera.lookAt(this.movieScreen.position);

    var spotLight = new SpotLight( 0xffffff );
    spotLight.position.set( 0, 0, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 50;
    spotLight.shadow.camera.far = 400;
    spotLight.shadow.camera.fov = 30;
    this.scene.add( spotLight );

    var planeb = new PlaneGeometry(75, 37.5, 1, 0);
    var planeMat = new MeshLambertMaterial( { color: 0xffffff }); //#4b74c6
    var planeBB = new Mesh( planeb, planeMat );
    planeBB.position.z = -0.01;
    this.scene.add(planeBB);


  },

  init() {

      NAVIGATION.renderTitle();

      // Well that's helpful.
      var that = this;

      if ( Detector == false ) { alert("Need WebGL"); } // Can put interesting static page here.

      else {

      console.log("WebGL works");

      that.loadingScreen();
      that.loadingManager = new LoadingManager();
      that.loadingManager.onProgress = function(item, loaded, total) {
      console.log(item, loaded, total);
      };

      that.loadingManager.onLoad = function() {
      console.log("loaded all resources");
      that.resources_loaded = true;
      };

      that.scene = new Scene();

      PARTICLE.createParticles(that.scene);

      that.defineCamera();
      that.camera.position.z = 5;


      that.defineRenderer();
      that.renderer.shadowMapEnabled = true;


      // Cannot add video texture to plane.
      that.defineVideo();
      that.definePlane();

      that.plane.receiveShadow = true


      that.composer = new EffectComposer( that.renderer );
      that.composer.addPass( new RenderPass ( that.scene, that.camera ));
/*
      var glitchPass = new GlitchPass();
      glitchPass.renderToScreen = true;
      that.composer.addPass( glitchPass );
*/

    // still not working
      var onWindowResize = function () {

        that.camera.aspect = window.innerWidth / window.innerHeight;
        that.camera.updateProjectionMatrix();
        that.renderer.setSize( window.innerWidth, window.innerHeight );
        console.log( 'width: '+ window.innerWidth + ' length: ' + window.innerHeight);
        }
      }

      window.addEventListener( 'resize' , onWindowResize(), false);

      var animate = function () {

        if (that.resources_loaded == false) {
          requestAnimationFrame( animate );
          that.renderer.render(that.loadScene, that.loadCamera);
          return;
        }


			requestAnimationFrame( animate );
      that.time = Date.now();
      that.composer.render();
			that.renderer.render(that.scene, that.camera);
			};

			animate();


    }
}

let Main = function Main() {
  return Object.assign(Object.create(main), {});
};

let MAIN = Main();

module.exports = MAIN;

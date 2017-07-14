let $ = require('jquery');
const http = require('http');
//const APP = require('./Three.js');
// APP.init();

import { Scene, BoxGeometry, WebGLRenderer, PerspectiveCamera, AxisHelper,
Mesh, MeshBasicMaterial, OrbitControls, AmbientLight, WindowResize, FullScreen,
MeshNormalMaterial, ThreeBSP } from 'three';

  $('body').append('<div id=\"ThreeJS\" style=\"position: absolute; left:0px; top:0px\"></div><script>');

var scene, camera, renderer, container, light;

init();
animate();

function init() {

  // SCENE
	scene = new Scene();

  var axes = new AxisHelper(10);
  scene.add(axes);

  // CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);

  camera.position.z = 25;
	//camera.position.set(0,150,50);
	camera.lookAt(scene.position);

  // RENDERER
	renderer = new WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );

	// LIGHT
	light = new AmbientLight(0xffffff);
	light.position.set(0,90,0);
	scene.add(light);




}

  function animate()
  {
    requestAnimationFrame( animate );
  	render();

  }


  function render()
  {
  	renderer.render( scene, camera );
  }

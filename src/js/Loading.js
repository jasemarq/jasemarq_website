import { Scene, Renderer, PerspectiveCamera, BoxGeometry,
  Mesh, MeshBasicMaterial } from 'three';

import cssLoading from '../scss/Loading.scss';

let loader = {

  resources_loaded: false,

  loadingScreen() {

    this.loadScene = new Scene();
    this.loadCamera = new PerspectiveCamera(90, 1280/720, 0.1, 100);
    this.loadBox = new Mesh(
      new BoxGeometry( 0.5, 0.5, 0.5 ),
      new MeshBasicMaterial( { color: 0x444ff })
    )

        this.loadBox.position.set(0, 0, 5);
        this.loadCamera.lookAt(this.loadBox.position);
        this.loadScene.add(this.loadBox);
  },

  loadAnimate( animate ) {
    if(this.resources_loaded == false) {
      requestAnimationFrame( animate );
      this.renderer.render(that.loadScene, that.loadCamera);
    }
  }

}

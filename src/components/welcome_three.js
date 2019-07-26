import { Component } from 'react'
import * as THREE from 'three'

const CANVAS_ID = 'welcome-three'

class WelcomeThree extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth /
                                              window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.id = CANVAS_ID;

    let welcome_section = document.querySelector('#welcome-section');
    welcome_section.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize.bind(this));

    // TESTING
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0xDF1474 } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;

    this.update();
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    this.renderer.render( this.scene, this.camera );

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  render() {
    return null;
  }
}

export default WelcomeThree;

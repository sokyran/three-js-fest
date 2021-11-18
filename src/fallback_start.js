import './style.css'

import * as THREE from 'three';
import {DragControls} from 'three/examples/jsm/controls/DragControls.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const cursor = { x: 0,  y: 0 }

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
})











/*
 * SCENE
 */

const scene = new THREE.Scene();

// scene.background = new THREE.Color(0xbfb4bb)

// const texture = new THREE.TextureLoader().load('space.jpg');
// scene.background = texture









/*
 * CAMERA
 */

const fov = 75
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 100

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 13

// https://threejs.org/examples/#webgl_camera

/*
 * RENDER
*/

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.canvas')
});
renderer.setSize( window.innerWidth, window.innerHeight); // sets canvas size and (0,0) point
renderer.setPixelRatio(window.devicePixelRatio)




/* 
 * LIGHTS
*/

const ambientLight = new THREE.AmbientLight(0x404040, 1.1)

const pointLight = new THREE.PointLight( 0xffffff, 1.2)
pointLight.position.set(-6,2,2);

scene.add(ambientLight, pointLight);

const sphereSize = 0.5;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize);
scene.add(pointLightHelper)


const cubeGeometry = new THREE.BoxGeometry(3,1,1);
const cubeMaterial = new THREE.MeshStandardMaterial( {color: 0xff0000} ); // #ffffff

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);



// const controls = new DragControls( [cube], camera, renderer.domElement );

// controls.addEventListener( 'dragstart', function ( event ) {
//   event.object.material.emissive.set( 0xaaaaaa );
// } );

// controls.addEventListener( 'dragend', function ( event ) {
//   event.object.material.emissive.set( 0x000000 );
// } );

// const orbitControls = new OrbitControls(camera, renderer.domElement)


renderer.render(scene, camera);

function animate() {
	requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // camera.position.x = - cursor.x * 3;
  // camera.position.y = cursor.y * 3;

  cube.rotation.y = cursor.x * 5.5;
  cube.rotation.x = cursor.y * 2.5;

}

animate();

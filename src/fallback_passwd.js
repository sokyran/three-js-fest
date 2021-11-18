import './style.css'

import * as THREE from 'three';
import { gsap } from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';






const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
})






/*
 * SCENE
 */

const scene = new THREE.Scene();

/*
 * CAMERA
 */

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 6;

/*
 * RENDER
*/

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.canvas')
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)

/* 
 * LIGHTS
*/

const pointLight = new THREE.PointLight( 0xffffff, 0.8);
pointLight.position.set(8,2,2);
const ambientLight = new THREE.AmbientLight(0x404040, 1)
scene.add(pointLight, ambientLight);

const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshStandardMaterial( {color: 0xff00ff} );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );











/* 
 * CREATING STARS
*/

// const material = new THREE.PointsMaterial({
//   size: 0.02,
// });
// const getRandomParticelPos = (particleCount) => {
//   const arr = new Float32Array(particleCount * 3);
//   for (let i = 0; i < particleCount; i++) {
//     arr[i] = (Math.random() - 0.5) * 10;
//   }
//   return arr;
// };
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(getRandomParticelPos(1350), 3)
// );
// const stars = new THREE.Points(geometry, material)
// scene.add(stars);


/**
 * PASSWORD FIELD LOGIC
 */

const passwdButton = document.querySelector('.input-showpasswd')
const input = document.querySelector('.input')

passwdButton.addEventListener('click', () => {
  let type = input.type === 'text' ? 'password' : 'text'
  input.type = type
  let btnText = passwdButton.textContent
  passwdButton.textContent = btnText === "Show" ? "Hide" : "Show"
  turnHead()
})


const turnHead = (() => {
  let lookingStraight = true
  return function() {
    if (headModel) {
      if (lookingStraight) {
        headModel.rotation.y = Math.PI
        // gsap.to(headModel.rotation, { y: Math.PI, ease: "elastic", duration: 2 })
      } else {
        headModel.rotation.y = 0
        // gsap.to(headModel.rotation, { y: 0, ease: "elastic",  duration: 2 })
      }
      lookingStraight = !lookingStraight
    }
  }
})()


let headModel = cube
scene.add(headModel)
// const loader = new GLTFLoader()

// loader.load('head/scene.gltf', (model) => {
//   scene.add(model.scene)
//   // model.scene.position.z = 2;
//   model.scene.position.z = -10;
//   headModel = model.scene
// })






function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

  camera.position.y += 0.001

  if (headModel) {
    headModel.rotation.x = cursor.y * 2.2
    // gsap.to(headModel.rotation, {x : Math.max(cursor.y * 2.2, -0.5)})
    headModel.position.y = camera.position.y 
  }
}

animate();

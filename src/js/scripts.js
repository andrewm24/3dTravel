import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( // initialise camera
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement); // initialise orbit controls

const axesHelper = new THREE.AxesHelper(3); // initialise axes helper
scene.add(axesHelper);

camera.position.set(-10,30,30); // set camera position
orbit.update(); // update orbit controls

const geometry = new THREE.BoxGeometry(); // initialise box 
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // initialise material
const box = new THREE.Mesh(geometry, material); // create box mesh
scene.add(box); // add box to scene

const planeGeometry = new THREE.PlaneGeometry(30,30); // initialise plane (width, height)
const planeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFFFFFF,
    side: THREE.DoubleSide // show both sides of the plane
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial); // create plane mesh
scene.add(plane);
plane.rotation.x = Math.PI / -2; // rotate plane 90 degrees

const gridHelper = new THREE.GridHelper(30); // initialise grid helper (size, divisions)
scene.add(gridHelper); 

const sphereGeometry = new THREE.SphereGeometry(4,100,100); // initialise sphere (radius, widthSegments, heightSegments)
const sphereMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x0000FF,  // initialise material
    wireframe: false}); // show wireframe
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // create sphere mesh
scene.add(sphere); // add sphere to scene

sphere.position.set(-10, 10, 0); // set sphere position

const gui = new dat.GUI(); // initialise dat.gui
const options = {
    sphereColor: '#ffea00'
};
gui.addColor(options, 'sphereColor').onChange(function(e){ // initialise dat.gui color picker
    sphere.material.color.set(e); // change sphere color
});
function animate(time) { // simulate box rotation animation
    console.log(time);

    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


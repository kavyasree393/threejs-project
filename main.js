// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import * as THREE from 'three';
// import { GLTFLoader } from 'GLTFLoader';
// // import * as THREE from './node_modules/three/build/three.module.js';
// // import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';


// // Scene
// const scene = new THREE.Scene();

// // Camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 1, 3);

// // Renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Load 3D Model
// const loader = new GLTFLoader();
// loader.load('earth/scene.gltf', (gltf) => {
//     gltf.scene.scale.set(8, 8, 8); // Scale the model
//     scene.add(gltf.scene);
// }, undefined, (error) => {
//     console.error('Error loading model', error);
// });

// // Lights
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(2, 2, 5);
// scene.add(light);

// // Animate
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();

// // Resize Handling
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });


import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';

// Get the canvas element
const canvas = document.getElementById('webgl');

// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Adjust the camera position

// Initialize the renderer with the canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Load 3D Model
const loader = new GLTFLoader();
loader.load(
    'earth/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(10, 10, 10); // Scale the model
    },
    (xhr) => console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`), // Loading Progress
    (error) => console.error('Error loading model', error)
);

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();



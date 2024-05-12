import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";
import loadWorld from "./world";
import { initPlayerControls, usePlayerControls } from "./playerController";

let camera, scene, renderer, stats, delta;


let prevTime = performance.now();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

init();
animate();

function init() {
	stats = new Stats();
	document.body.appendChild(stats.dom);

	const fov = 75;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 1;
	const far = 1000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.y = 10;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
	light.position.set(0.5, 1, 0.75);

	scene.add(light);

	loadWorld(scene);

	initPlayerControls(camera, scene);

	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	stats.update();

	const time = performance.now();

	delta = (time - prevTime) / 1000;
	usePlayerControls(delta);

	prevTime = time;

	renderer.render(scene, camera);
}

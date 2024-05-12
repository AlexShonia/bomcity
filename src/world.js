import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { texture } from "three/examples/jsm/nodes/Nodes.js";

let scene;
let floor;

export default function loadWorld(_scene) {
	scene = _scene;
	// scene.fog = new THREE.Fog(0xffffff, 0, 750);

	// loadFloor();
    loadSky();
	loadBuildings()
}

function loadFloor() {
	let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 50, 50);
	floorGeometry.rotateX(-Math.PI / 2);

	// vertex displacement

	let position = floorGeometry.attributes.position;

	const textureLoader = new THREE.TextureLoader();
	textureLoader.load("textures/pavement.jpg", function (texture) {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(150, 150);

		const floorMaterial = new THREE.MeshStandardMaterial({
			map: texture,
		});

		floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.castShadow = false;
		floor.receiveShadow = true;
		scene.add(floor);
	});
}

function loadSky() {
	const sky1 = new THREE.CubeTextureLoader()
		.setPath("/")
		.load([
			"posx.jpg",
			"negx.jpg",
			"posy.jpg",
			"negy.jpg",
			"posz.jpg",
			"negz.jpg",
		]);
	scene.background = sky1;
	scene.environment = sky1;
}

function loadBuildings() {
	const modelLoader = new GLTFLoader()
	modelLoader.load('city_building_set.glb', function(city) {
		console.log(city);
		city.scene.scale.setScalar(0.05)
		city.scene.position.x = 700;
		city.scene.position.z = 380;
		scene.add(city.scene)
	})
}

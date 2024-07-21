const { GLTFLoader } = require("../lib/gltf");

define(["sugar-web/activity/activity"], function (activity) {
	// Manipulate the DOM only when it is ready.
	requirejs(["domReady!"], function (doc) {
		// Initialize the activity.
		activity.setup();

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.shadowMap.enabled = true;
		renderer.setSize(window.innerWidth, window.innerHeight);
		const canvas = document.getElementById("canvas");
		canvas.appendChild(renderer.domElement);
		const scene = new THREE.Scene();
		scene.background = new THREE.Color("#000000");

		const light = new THREE.DirectionalLight(0xffffff, 0.4);
		light.castShadow = true;
		light.position.set(5, 10, 7.5);
		scene.add(light);

		const ambientLight = new THREE.AmbientLight(0x404040);
		scene.add(ambientLight);

		const camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.set(0, 10, 20);
		camera.lookAt(0, 0, 0);

		// Define bones
		const bones = [];

		const shoulder = new THREE.Bone();
		const elbow = new THREE.Bone();
		const hand = new THREE.Bone();

		shoulder.add(elbow);
		elbow.add(hand);

		bones.push(shoulder);
		bones.push(elbow);
		bones.push(hand);

		shoulder.position.y = -5;
		elbow.position.y = 0;
		hand.position.y = 5;

		const armSkeleton = new THREE.Skeleton(bones);

		// Create a simple geometry and skin it with the skeleton
		const geometry = new THREE.CylinderGeometry(0.5, 0.5, 10, 8, 1);
		const material = new THREE.MeshPhongMaterial({
			skinning: true,
			color: 0x00ff00,
		});

		const skinnedMesh = new THREE.SkinnedMesh(geometry, material);
		const skeletonHelper = new THREE.SkeletonHelper(skinnedMesh);
		skeletonHelper.material.linewidth = 2; // Adjust linewidth for better visibility
		scene.add(skeletonHelper);

		// Bind the skeleton to the skinned mesh
		skinnedMesh.add(bones[0]);
		skinnedMesh.bind(armSkeleton);

		skinnedMesh.position.set(0, 5, 0); // Adjust position so it's in the camera's view
		scene.add(skinnedMesh);
		

		// const loader = new GLTF();

		animate();

		function animate(time) {
			renderer.render(scene, camera);
		}

		renderer.setAnimationLoop(animate);
	});
});

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

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.castShadow = true;
        const leftLight = new THREE.DirectionalLight(0xffffff, 1);
        leftLight.castShadow = true;
        const rightLight = new THREE.DirectionalLight(0xffffff, 1);
        rightLight.castShadow = true;
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        const bottomLight = new THREE.DirectionalLight(0xffffff, 1);
        const topLight = new THREE.DirectionalLight(0xffffff, 1);
        topLight.castShadow = true;
        leftLight.position.set(-30, 20, -30);
        rightLight.position.set(30, 20, -30);
        backLight.position.set(0, 20, 30);
        light.position.set(0, 20, -30);
        bottomLight.position.set(0, -20, -30);
        topLight.position.set(0, 10, 0);
        scene.add(backLight);
        scene.add(rightLight);
        scene.add(leftLight);
        scene.add(light);
        scene.add(bottomLight);
        scene.add(topLight);

        const ambientLight = new THREE.AmbientLight(0x222222); // Soft ambient lighting
        scene.add(ambientLight);
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 10, 20);
        camera.lookAt(0, 0, 0);

        const orbit = new OrbitControls.OrbitControls(
            camera,
            renderer.domElement
        );
        orbit.update();
        orbit.listenToKeyEvents(document.querySelector("body"));

        const loader = new THREE.GLTFLoader();

        loader.load(
            // resource URL
            'models/skeleton/skeleton.gltf',
            // called when the resource is loaded
            function (gltf) {
                scene.add(gltf.scene);

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
            },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened');
                console.log(error);
            }
        );

// Function to set the material color of a model
function setModelColor(model, color) {
    model.traverse((node) => {
        if (node.isMesh) {
            if (node.material) {
                node.material.color.set(color);
            }
        }
    });
}

// Loader for the heart model
loader.load(
    // resource URL
    'models/heart/heart.gltf',
    // called when the resource is loaded
    function (gltf) {
        // Move the heart model up
        gltf.scene.position.y += 4; // Adjust this value as needed

        // Set the heart model color to red
        setModelColor(gltf.scene, new THREE.Color(0xff0000));

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
        console.log(error);
    }
);

// Loader for the digestive model
loader.load(
    // resource URL
    'models/digestive/digestive.gltf',
    // called when the resource is loaded
    function (gltf) {
        // Move the digestive model up
        gltf.scene.position.y += 3; // Adjust this value as needed

        // Scale up the digestive model
        gltf.scene.scale.set(4, 4, 4); // Scale up by a factor of 4

        // Set the digestive model color to red
        setModelColor(gltf.scene, new THREE.Color(0x00ff00));

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
        console.log(error);
    }
);

		loader.load(
            // resource URL
            'models/lungs/lungs.gltf',
            // called when the resource is loaded
            function (gltf) {
                // Move the heart model up
                gltf.scene.position.y += 3; // Adjust this value as needed
				gltf.scene.scale.set(7, 7, 7); // Scale up by a factor of 2

                scene.add(gltf.scene);

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
            },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened');
                console.log(error);
            }
        );

        animate();

        function animate(time) {
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);
    });
});

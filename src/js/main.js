boilerplate.ns('boilerplate.main');

boilerplate.main = (function () {
	var FAR = 2000,
	    NEAR = 1,
	    FOV = 60,
	    SIZE = 512,
	    divDom, stats,
	    camera, scene, renderer,
	    container, clock,
	    uniforms;

	return {
		init : function () {
			divDom = document.createElement('div');
			document.body.appendChild(divDom);

			scene = new THREE.Scene();
			var aspect = window.innerWidth / window.innerHeight;
			camera = new THREE.Camera()
			camera.position.z = 1;
			scene.add(camera);
			container = new THREE.Object3D();
			scene.add(container);

			renderer = new THREE.WebGLRenderer( {antialias: true} );
			renderer.setSize(window.innerWidth, window.innerHeight);

			divDom.appendChild( renderer.domElement );

			clock = new THREE.Clock( false );
			clock.frameNumber = 0;
			clock.start();

			boilerplate.main.addMesh();

			boilerplate.main.onWindowResize();

			window.addEventListener( 'resize', 
				boilerplate.main.onWindowResize, false );

			boilerplate.main.animate();
		},

		addMesh: function () {
			var geometry = new THREE.PlaneBufferGeometry( SIZE, SIZE );
			uniforms = {
				time: { type: "f", value: 1.0 },
				resolution: { type: "v2", value: new THREE.Vector2() }
			};

			var material = new THREE.ShaderMaterial( {
				uniforms: uniforms,
				vertexShader: document.getElementById( 'vertexShader' ).textContent,
				fragmentShader: document.getElementById( 'fragmentShader' ).textContent
			});
			var mesh = new THREE.Mesh( geometry, material );
			container.add(mesh);
		},

		onWindowResize: function () {
			uniforms.resolution.value.x = window.innerWidth;
			uniforms.resolution.value.y = window.innerHeight;

			renderer.setSize( window.innerWidth, window.innerHeight );
		},

		animate: function () {
			requestAnimationFrame(boilerplate.main.animate);
			boilerplate.main.update();
			boilerplate.main.render();
		},

		update: function () {
			uniforms.time.value += 0.05;
		}, 

		render: function () {
			renderer.render( scene, camera );
		}
	}
})();

document.addEventListener('DOMContentLoaded', function() {
    boilerplate.main.init();
  }, false
);
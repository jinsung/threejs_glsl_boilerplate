nikeGoogle3D.ns('nikeGoogle3D.main');

nikeGoogle3D.main = (function () {
	var SIZE = 2,
	    divDom, stats,
	    camera, scene, renderer,
	    container, clock,
	    uniforms;

	return {
		init : function () {
			divDom = document.createElement('div');
			document.body.appendChild(divDom);

			camera = new THREE.Camera()
			camera.position.z = 1;

			scene = new THREE.Scene();

			//scene.add(camera);
			container = new THREE.Object3D();
			scene.add(container);

			renderer = new THREE.WebGLRenderer( );
			renderer.setPixelRatio( window.devicePixelRatio );

			divDom.appendChild( renderer.domElement );

			clock = new THREE.Clock( false );
			clock.frameNumber = 0;
			clock.start();

			nikeGoogle3D.main.addMesh();

			nikeGoogle3D.main.onWindowResize();

			window.addEventListener( 'resize', 
				nikeGoogle3D.main.onWindowResize, false );

			nikeGoogle3D.main.animate();
		},

		addMesh: function () {
			var geometry = new THREE.PlaneBufferGeometry( SIZE, SIZE );
			uniforms = {
				iGlobalTime: { type: "f", value: 1.0 },
				iResolution: { type: "v2", value: new THREE.Vector2() }
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
			renderer.setSize( window.innerWidth, window.innerHeight );
			uniforms.iResolution.value.x = renderer.domElement.width;
			uniforms.iResolution.value.y = renderer.domElement.height;
		},

		animate: function () {
			requestAnimationFrame(nikeGoogle3D.main.animate);
			nikeGoogle3D.main.update();
			nikeGoogle3D.main.render();
		},

		update: function () {
			uniforms.iGlobalTime.value += 0.05;
		}, 

		render: function () {
			renderer.render( scene, camera );
		}
	}
})();

document.addEventListener('DOMContentLoaded', function() {
    nikeGoogle3D.main.init();
  }, false
);
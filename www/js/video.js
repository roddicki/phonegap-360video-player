// Last time the scene was rendered.
	var lastRenderTime = 0;
	// Currently active VRDisplay.
	var vrDisplay;
	// How big of a box to render.
	var boxSize = 5;
	// Various global THREE.Objects.
	var scene;
	var geo1;
	var controls;
	var effect;
	var camera;
	// EnterVRButton for rendering enter/exit UI.
	var vrButton;


	function onLoad() {
	  console.log("\n\n----------\n--LOADING--\n");
	  // Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
	  // Only enable it if you actually need to.
	  var renderer = new THREE.WebGLRenderer({antialias: false});
	  renderer.setPixelRatio(window.devicePixelRatio);

	  // Append the canvas element created by the renderer to document body element.
	  document.body.appendChild(renderer.domElement);

	  // Create a three.js scene.
	  scene = new THREE.Scene();

	  // Create a three.js camera.
	  var aspect = window.innerWidth / window.innerHeight;
	  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 10000);

	  controls = new THREE.VRControls(camera);
	  controls.standing = true;
	  camera.position.y = controls.userHeight;

	  // Apply VR stereo rendering to renderer.
	  effect = new THREE.VREffect(renderer);
	  effect.setSize(window.innerWidth, window.innerHeight);


	  //ADD VIDEO
	  var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
	  geometry.scale( - 1, 1, 1 );
	  var video = document.createElement( 'video' );
	  threeSixtyVideo.element = video;
	  video.setAttribute('webkit-playsinline', 'webkit-playsinline');// Fix fullscreen problem on IOS 8 and 9
	  video.setAttribute('playsinline', 'playsinline');// Fix fullscreen problem on IOS 10
	  video.autoplay = false;
	  video.loop = true;
	  // video.src = "videos/pano.webm";
	  video.src = threeSixtyVideo.source;
	  //video.poster = "img/poster.png";
	  var texture = new THREE.VideoTexture( video );
	  texture.minFilter = THREE.LinearFilter;
	  texture.format = THREE.RGBFormat;
	  var material   = new THREE.MeshBasicMaterial( { map : texture } );
	  mesh = new THREE.Mesh( geometry, material );
	  //mesh.position.y = 190;
	  scene.add(mesh);
	  ////END ADD VIDEO
	  ///
	  
	  window.addEventListener('resize', onResize, true);
	  window.addEventListener('vrdisplaypresentchange', onResize, true);

	  // Initialize the WebVR UI icon
	  var uiOptions = {
	    color: 'black',
	    background: 'white',
	    corners: 'round'
	  };
	  vrButton = new webvrui.EnterVRButton(renderer.domElement, uiOptions);
	  vrButton.on('exit', function() {
	    camera.quaternion.set(0, 0, 0, 1);
	    camera.position.set(0, controls.userHeight, 0);
	  });
	  vrButton.on('hide', function() {
	    document.getElementById('ui').style.display = 'none';
	  });
	  vrButton.on('show', function() {
	    document.getElementById('ui').style.display = 'inherit';
	    //when the VR 'Enter VR' icon loads / displays
	    console.log("show vr button");
	    video.pause();
	    //add more video controls if needed
	  });
	  document.getElementById('vr-button').appendChild(vrButton.domElement);

	  //when magic-window clicked
	  document.getElementById('magic-window').addEventListener('click', function() {
	    document.getElementById('poster').style.display = 'none';
	    vrButton.requestEnterFullscreen();
	    video.play();
	    console.log(location.href);
	  });
	  
	  //when vr button clicked
	  document.getElementById('vr-button').addEventListener('click', function() {
	    document.getElementById('poster').style.display = 'none';
	    video.play();
	    //ONLY NEEDED FOR IOS
	    //screen.orientation.lock('landscape');
	    console.log("clicked vr button");
	  });

	  //when exit clicked
	  //document.getElementById('exit-fullscreen').addEventListener('click', function() {
	  //  document.getElementById('exit-fullscreen').style.display = 'none';
	  //});

	  setupStage();
	}



	// Request animation frame loop function
	function animate(timestamp) {
	  var delta = Math.min(timestamp - lastRenderTime, 500);
	  lastRenderTime = timestamp;

	  // Only update controls if we're presenting.
	  if (vrButton.isPresenting()) {
	    controls.update();
	  }
	  // Render the scene.
	  effect.render(scene, camera);

	  vrDisplay.requestAnimationFrame(animate);
	}

	function onResize(e) {
	  effect.setSize(window.innerWidth, window.innerHeight);
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
	}

	// Get the HMD, and if we're dealing with something that specifies
	// stageParameters, rearrange the scene.
	function setupStage() {
	  navigator.getVRDisplays().then(function(displays) {
	    if (displays.length > 0) {
	      vrDisplay = displays[0];
	      if (vrDisplay.stageParameters) {
	        setStageDimensions(vrDisplay.stageParameters);
	      }
	      vrDisplay.requestAnimationFrame(animate);
	    }
	  });
	}

	function setStageDimensions(stage) {
	 //do you need this? 

	}

	

	
	onLoad();

	//window.addEventListener('load', onLoad);



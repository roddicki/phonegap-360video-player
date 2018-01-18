document.addEventListener('deviceready', function() {
    console.log('\n-------------\nDEVICE READY');

   	//the video element is threeSixtyVideo.element
   	console.log(threeSixtyVideo.element);

   	//pause video
   	//threeSixtyVideo.element.pause();
   	
   	//play video
   	//threeSixtyVideo.element.play();

   	///Monitor video
	threeSixtyVideo.element.ontimeupdate = function() {TimeElapsed(threeSixtyVideo.element)};
   	
   	//monitor the video playback
	function TimeElapsed(video){
	  console.log(video.currentTime);
	  //do other stuff
	}

});

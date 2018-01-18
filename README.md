# PhoneGap audio player 

A Phonegap / Cordova project that is a 360 mp4 video player for Android and iOS

Adapted from https://github.com/borismus/webvr-boilerplate

This projects aims to give some simple HTML5 style functionality to the 360 video playback 

## Usage
### Set up
Create a new phonegap project using Phonegap cli or desktop app. 

Replace the www directory with this working repository (it includes a test video file).

Replace the video file in www/video with your own video 

Replace the reference to the video file in index.html
	
	var threeSixtyVideo = {
  		source:"video/yourvideo.mp4", 
  		element:""
	};

The path should to the video file should be configured from the www directory

Replace the config.xml with this config.xml and change the <widget id> and <name> / <author> / <description> details
	
	<widget id="com.yourname.project" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">

Note the preferences needed for inline Media Playback and auto play
	
	<preference name="AllowInlineMediaPlayback" value="true" />
    <preference name="MediaPlaybackRequiresUserAction" value="false"/>


audio-player.js file should be added to index.html 
	
	<script type="text/javascript" src="js/audio-player.js"></script>

To play audio use the following inside the 'deviceready' function

	audio.play("path/to/my/audioFile.mp3");

The path should to the audioFile should be configured from the www directory

To pause any audio playing
	
	audio.pause();

(typically these would be triggered by an event listener)

It is possible to use multiple audio files with multiple instances of audio.play without conflict. Triggering multiple files to play will result in overlapping audio playback.

	audio.play("path/to/my/audioFile1.mp3"); 
	audio.play("path/to/my/audioFile2.mp3"); 


## android-minSdkVersion (Android only)

Minimum SDK version supported on the target device. Maximum version is blank by default.

This template sets the minimum to `21`.

    <preference name="android-minSdkVersion" value="21" />
    <preference name="android-targetSdkVersion" value="25" />

## &lt;access ...&gt; (All)

This template defaults to wide open access.

    <access origin="*" />

It is strongly encouraged that you restrict access to external resources in your application before releasing to production.

For more information on whitelist configuration, see the [Cordova Whitelist Guide][cordova-whitelist-guide] and the [Cordova Whitelist Plugin documentation][cordova-plugin-whitelist]

## [www/index.html][index-html]

## Content Security Policy (CSP)

The default CSP is similarly open:

    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" />

Much like the access tag above, you are strongly encouraged to use a more restrictive CSP in production.

A good starting point declaration might be:

    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: 'unsafe-inline' https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *" />

For more information on the Content Security Policy, see the [section on CSP in the Cordova Whitelist Plugin documentation][cordova-plugin-whitelist-csp].

Another good resource for generating a good CSP declaration is [CSP is Awesome][csp-is-awesome]


[phonegap-cli-url]: http://github.com/phonegap/phonegap-cli
[cordova-app]: http://github.com/apache/cordova-app-hello-world
[bithound-img]: https://www.bithound.io/github/phonegap/phonegap-app-hello-world/badges/score.svg
[bithound-url]: https://www.bithound.io/github/phonegap/phonegap-app-hello-world
[config-xml]: https://github.com/phonegap/phonegap-template-hello-world/blob/master/config.xml
[index-html]: https://github.com/phonegap/phonegap-template-hello-world/blob/master/www/index.html
[cordova-whitelist-guide]: https://cordova.apache.org/docs/en/dev/guide/appdev/whitelist/index.html
[cordova-plugin-whitelist]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist
[cordova-plugin-whitelist-csp]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist#content-security-policy
[csp-is-awesome]: http://cspisawesome.com

## Generate icons

Generate icons from a 1024px x 1024px master at http://pgicons.abiro.com/
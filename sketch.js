// ml5 has pre-made machine learning libraries to use
// posenet is a library in ml5 and is a machine learning model
// allows for real-time human-pose estimation

let video;
let poseNet;
let noseX = 0; 
let noseY = 0;
let eyelX = 0; 
let eyelY = 0;

function setup() {
  createCanvas(640, 480);
  // adds a webcam image under the canvas
  video = createCapture(VIDEO);
  // hide the video element to only show the video on the canvas
  video.hide();
  // takes time for this to run - loads poseNet model
  poseNet = ml5.poseNet(video, modelReady);
  // pose event - array of all pose information
  poseNet.on('pose', gotPoses);
}

// callback event for when poseNet has detected a pose
function gotPoses(poses){
  //console.log(poses);
  // make sure there is at least one pose
  if (poses.length > 0) {
  	let nX = poses[0].pose.keypoints[0].position.x;
  	let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x; 
    let eY = poses[0].pose.keypoints[1].position.y;
    // linear interpolation - finding a point in between
		// two other points  -- this will smooth out the choppiness
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  } 
}

// callback event that tells us when ml5 is finished running model
function modelReady() {
  console.log("model ready");
}

function draw() {
  background(220);
  // draw the image from the webcam onto the canvas to add animation
  image(video, 0, 0);
  fill (255, 0,0);
  
	// detect distance from the camera
  //let d = dist(noseX, noseY, eyelX, eyelY);
  ellipse(noseX, noseY, 10);
  ellipse(eyelX, eyelY, 10);
}

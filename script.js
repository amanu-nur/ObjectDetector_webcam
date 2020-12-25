let video;
let detector;
let detections = [];

function preload() {
  detector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
  console.log("Detection is ready");
}

function getCallback(error, result) {
  if (error) {
    console.log(error);
  }
  console.log(result);
  detections = result;
  detector.detect(video, getCallback);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide();
  // console.log(detector)
  detector.detect(video, getCallback);
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(170, 255, 0);
    textSize(20);
    text(object.label, object.x + 10, object.y + 24);
  }
}

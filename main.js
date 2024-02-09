objects = [];
alram = new Audio("Alram.wav");

function setup(){
 canvas = createCanvas(300,300);
 video = createCapture(VIDEO);
 video.hide();
}

function start(){
    Objectdetector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("Status").innerHTML = "Status: Detecting objects";
}

function draw(){
 image(video,0,0,300,300);
 if(status != ""){
    Objectdetector.detect(video,gotresults);
  R = random(255);
  B = random(255);  
  G = random(255);

  if(objects.length == 0){
   alram.play();
  }
  else if(objects[0].label !== "person"){
   alram.play();
  }

  else{
    alram.stop(5);
  }

  for(i = 0; i < objects.length ;i++){
    document.getElementById("Status").innerHTML = "Status: Objects are detected";
    fill(R,B,G);
    persent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + persent + "%",objects[i].x,objects[i].y);
    noFill();
    stroke(R,B,G);
    rect(objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height);
  }
}
}

function modelloaded(){
    console.log("Model is loaded");
    status = true;
}

function gotresults(error,results){
 if(error){
  console.error(error);
}

else{
  console.log(results);
  objects = results;
}
}
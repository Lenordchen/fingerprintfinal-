var canvas;
var stars = [];
var trans;
var dtrans;
var greeting, t_top,button, btn_1, btn_2, btn_3, btn_4, btn_5, btn_6;
var circles;
var spots;
var fingerprint;
var spots = [];
var circles = [];
var count = 0;
var player = new Tone.Player("chimes/bgm.mp3").toMaster();

var playState = 0;
var myScale = ['F2','G2','Bb2','D3','E3','F3','G3','A3','Bb3','C4','D4'];
// var myChord = [['D3','E3'], ['E3','G3'],['D3','A3'],['Bb2','C4'],['D4,Bb2']
//                ['F2','A3'],['F2','F3','Bb3'],['D4','D3','A3']];

var sampler = new Tone.Sampler({
  'Bb2':'./chimes/bb2.mp3',
  'Bb3':'./chimes/bb3.mp3',
  'G2':'./chimes/g2.mp3',
  'F2':'./chimes/f2.mp3',
  'F3':'./chimes/f3.mp3',
  'D3':'./chimes/d3.mp3',
  'E3':'./chimes/e3.mp3',
  'G3':'./chimes/g3.mp3',
  'A3':'./chimes/a3.mp3',
  'C4':'./chimes/c4.mp3',
  'D4':'./chimes/d4.mp3',
});



sampler.toMaster();
const polySynth = new Tone.PolySynth(6,Tone.Synth).toMaster();


 // function preload(){
 //    fingerprint = loadImage('fingerprints/000004.jpg');
 //  }

 function setup() {
   // create canvas
   noCursor();
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
    background(0);

    for (var i = 0; i < 400; i++) {
    // stars[i] = new Star();
    let star = new Star(random(0,width), random(0,height), random(0,5), 1, -0.01);
    stars.push(star);
    }

    // spots = [];
    // circles = [];
   //maxAttempts = fingerprint.width * fingerprint.height

    greeting = createElement('h2', 'Welcome,  please wear the headphones and put your finger on the box in the left. If you are ready, press Start');
    greeting.class("t1");
    // greeting.id("greeting");
    // greeting.position(width/2-140, height/2-50);

    button = createButton('Start');
    button.class("button");
    // button.position(greeting.x + 120, height/2+30);
    button.mousePressed(welcome);

 }

 function welcome() {
    greeting.hide();
    button.hide();
    t1 = createElement('h2','Each biological organism has an unique pattern, and your fingerprints are unique to each and everyone of you')
    t1.class("t1");
    //t1.position(width/2-120, height/2-50);
    let changeOne = setTimeout(changeText, 5000);
    player.start();
  playing = true;

  }

  function changeText() {
    t1.hide();
    button.hide();
    t2 = createElement('h2', 'Because of this, fingerprints have been widely used for biometric and social identification');
    t2.class("t1");
    //t2.position(width/2-120, height/2-50);
    let changeTwo = setTimeout(changeText_2, 5000);
  }

  function changeText_2() {
    t2.hide();
    t3 = createElement('h2', 'However, fingerprint represents our individuality');
    t3.class("t1");
    let changeThree = setTimeout(changeText_3, 5000);
  }

  function changeText_3(){
    t3.hide();
    t4 = createElement('h2', 'Instead of being asked for proving identification, you will hear the melodies from you and your body');
    t4.class("t1");
    let changeFour = setTimeout(changeText_4, 5000);
  }

  function changeText_4(){
    t4.hide();
    t5 = createElement('h2', 'All biometric data will be automatically deleted and will not being archived');
    t5.class("t1");
    let changeFive = setTimeout(startQuestion, 5000);
  }

  function startQuestion(){
    t5.hide();
    t6 = createElement('h2', ' If you are ready, press start and start your sound journey');
    t6.class("t1");
    btn_1 = createButton("Start")
    btn_2 = createButton("Leave")
    // btn_1.class("button");
    btn_1.class("btn_1");
    // btn_2.class("button");
    btn_2.class("btn_2");

    btn_1.mousePressed(loadLatestFingerprint);

  }

  function finalText_1(){
  t6.hide();
  btn_1.hide();
  btn_2.hide();
  t10 = createElement('h2', 'Thank you');
  t10.class('t1');

}

function loadLatestFingerprint(){

  player.stop();
  playing = false;
    loadJSON('http://localhost:8080/getfingerprints',gotFingerprint);
  }

function gotFingerprint(listOfFingerprint){
    print(listOfFingerprint)
    loadImage("fingerprint_bitmap/"+listOfFingerprint[listOfFingerprint.length-1],fingerPrintLoad);
}

function fingerPrintLoad(latestFingerprint){
    fingerprint = latestFingerprint;


    // startExperience();
    showInstruction();
}

function showInstruction() {
    t_top = createElement('h2', 'Please touch your fingerprint and move it')
    t_top.class("t2");
    startExperience()
    // t_top.position(windowWidth/2-140, windowHeight/2-100);
}

 function startExperience(){
    noCursor();
    t6.hide();
    btn_1.hide();
    btn_2.hide();
    // t_top = createElement('h2', 'Please touch your fingerprint and move it')
    // t_top.id("t2");
    // t_top.position(windowWidth/2-140, windowHeight/2-100);
    playState = 1;

    // t_top = createElement('h2', 'Please touch your fingerprint and move it')
    // t_top.id("t2");
    // t_top.position(windowWidth/2-140, windowHeight/2-100);


     var density = displayDensity();
     pixelDensity(1);
     background(0);

    //image processing
    fingerprint.filter(THRESHOLD);
    fingerprint.loadPixels();
    for (let i = 0; i < fingerprint.pixels.length; i+=4) {
      let r = fingerprint.pixels[i];
      let g = fingerprint.pixels[i+1];
      let b = fingerprint.pixels[i+2];

      if(r === 255 && g === 255 && b ===255) {
        fingerprint.pixels[i] = 0;
        fingerprint.pixels[i+1] = 0;
        fingerprint.pixels[i+2] = 0;
      } else {
        fingerprint.pixels[i] = 255;
        fingerprint.pixels[i+1] = 255;
        fingerprint.pixels[i+2] = 255;
      }

     }
     fingerprint.updatePixels();


     Tone.Transport.bpm.value = 120;
     toneGenerated();


     for (let x = 0; x < fingerprint.width; x++) {
     for (let y = 0; y < fingerprint.height; y++) {
       var index = x + y * fingerprint.width;
       var c = fingerprint.pixels[index*4];
       var b = brightness([c]);
       if (b > 1) {
         spots.push(createVector(x, y));
       }
     }
   }

 }
 function draw() {
    //don't play until click the button

    background(0);

    for (let i = 0; i < stars.length; i++) {

     stars[i].show();
     stars[i].fade();
     // stars[i].transparancy();
   }

   if(playState == 0 ){
     return // stop here!
   }

   if(playState == 2){
     //end screen
     //fade
     fadeCircles();
     t_top.hide();
   }

   if(playState == 3) {
     // changeTextAgain_1();
   }

   if (playState == 4){
     // startQuestionAgain_1();
   }
   if(playState ==5 ){
     gatherCircles();
   }


   if(playState == 1 || playState == 10){
     //image visualization
     let fingerPrintX = windowWidth/2-215,
      fingerPrintY = windowHeight/2-250,
      fingerPrintDrawnWidth = fingerprint.width * 1.8,
      fingerPrintDrawnHeight = fingerprint.height * 1.8
     // image(fingerprint, fingerPrintX, fingerPrintY, fingerPrintDrawnWidth, fingerPrintDrawnHeight)

      //playToneForRow(mouseY, width, '4n');
      //draw 8 circles in every framecount;
     var total = 8;
     var count = 0;



     //if (attempts < maxAttempts) {
       while (count < total) {
          // if (newC !== null) {
          //put new circles into the array.
            if (circles.length < 4000){
              var newC = newCircle();
              circles.push(newC);
            }
            count++;
        }

        if (playState == 10) {
          while (circles.length < 4000) {
            var newC = newCircle();
            circles.push(newC);
          }

        }


    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      if (circle.r > 5 && circle.r <7) {
        circle.alpha = random(100,255);
      }
      if (circle.growing) {
        if (circle.edges()) {
          circle.growing = false;
        } else {
          for (let j = 0; j < circles.length; j++) {
            var other = circles[j];
            if (circle !== other) {
              var d = dist(circle.x, circle.y, other.x, other.y);
              var distance = circle.r + other.r;

              if (d-5 < distance) {
                circle.growing = false;
                break;
              }
            }
          }
        }
      }

      circle.show(fingerPrintX, fingerPrintY, fingerPrintDrawnWidth, fingerPrintDrawnHeight);
      circle.grow();
      // if (fingerprintFadeOut){
      //   circles.splice(i,1);
      // }
    }
  }
}



//image
function isPixelBlue(index) {
  // console.log(`(${pixels[index]},${pixels[index+1]},${pixels[index+2]})`);
  //img.pixels[]

   loadPixels();
   if (pixels[index] === 0 && pixels[index+1] === 0
          && pixels[index+2] === 0) {
    // Pixel is black
    //console.log("black");
    return false;
  }
  //console.log("blue");
    return true;
}

function howManyPixelsInARowAreBlue(y, imgWidth) {
  var count = 0;
  y = Math.trunc(y);
  for (let x = 0; x < imgWidth; x++) {
    var pixelIndex = (x + y * imgWidth) * 4;
    //can I add createPoint here?
    if (isPixelBlue(pixelIndex)) { // this pixel is blue
      count++;
    }
  }

  console.log(`${y} y count: ${count}`);
  return count;
}

function playToneForRow(y, imgWidth) {
  //How to let black pixels stop playing here?
  var pixelIndex = (mouseX + mouseY * imgWidth) * 4;
  //console.log(pixelIndex);
  if (isPixelBlue(Math.trunc(pixelIndex))) { // this pixel is blue
    console.log("it's blue, play");
      var numberOfBluePixels = howManyPixelsInARowAreBlue(mouseY, imgWidth);
      console.log("Number of Blue PIXELS: "+ numberOfBluePixels);
      // if (((Math.trunc(numberOfBluePixels)) > 0 && (Math.trunc(numberOfBluePixels))) < 215){
        var noteIndex = Math.trunc(map(numberOfBluePixels, 0, 300, 0, myScale.length));
        console.log("NOTE INDEX: "+ noteIndex);
        var note = myScale[noteIndex];

        console.log("Ready to play note: "+note);

      // synth.triggerAttackRelease(note, '8n');
          if(sampler.loaded) {
            sampler.triggerAttack(note);
          }
    }
  }



 function toneGenerated() {
   var y = 0;
   Tone.Transport.scheduleRepeat(function repeat(time) {
     if (y > height) {
       // we passed the last row
       Tone.Transport.stop();
       return;
     }
     if (mouseX > windowWidth/2-215 && mouseX < windowWidth/2-215 + fingerprint.width * 1.8
        && mouseY > 140 && mouseY < fingerprint.height * 1.8 + windowHeight/2-250) {
        playToneForRow(y, width);
      }
        y++;
   }, '4n');

    Tone.Transport.start();

    let changeScene = setTimeout(showTextAgain, 5000);

 }

 function showTextAgain(){
    btn_3 = createButton('next');
    btn_3.class('btn_3');
    btn_3.mousePressed(fingerprintFadeOut);
    // btn_4 = createButton('next2');
    // btn_4.mousePressed(fingerprintGather);
 }

 function fingerprintFadeOut(){
   t_top.hide();
   playState = 2;
 }

 function fingerprintGather(){
   playState = 5;
 }

 function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  //pick the point outside of the circle.
  //check whether the point is in the circle or not.

  // for (let i = 0; i < circles.length; i++) {
  //   var circle = circles[i];
  //   var d = dist(x, y, circle.x, circle.y);
  //   if (d < circle.r) {
  //     //inside of the circle
  //     valid = false;
  //     break;
  //   }
  // }
  if (valid) {
    //add new circles
    return new Circle(x, y, fingerprint.width, fingerprint.height);
  } else {
    return null;
  }
}

function fadeCircles() {

  if(frameCount % 1 == 0){
    if(circles.length > 0){
      circles.pop();
    }
  }
  btn_3.hide();
  t6 = createElement('h2', 'Fingerprint is not only a form of identification, but also a medium to connect us with the world ');
  t6.class('t1');
  let changeSix = setTimeout(changeTextAgain, 5000);
  playState = 3;
}

// function changeTextAgain() {
//   playState = 3;
// }

function changeTextAgain() {
  t6.hide();
  t7 = createElement('h2', 'This connection serves to remind us that we are interconnected individuals ');
  t7.class('t1');
  let changeSeven = setTimeout(startQuestionAgain,5000);

}

function startQuestionAgain() {
  t7.hide();
  t8 = createElement('h2', 'Do you want to join the cosmos?');
  t8.class('t1');
  btn_4 = createButton('Yes');
  btn_4.class('btn_1');
  btn_5 = createButton('No');
  btn_5.class('btn_2');
  btn_4.mousePressed(fingerprintGather);
  btn_5.mousePressed(finalText);
}

// function farewellText(){
//   t9 = createElement('h2', 'Thank you');
//   t9.class('t1');
// }



function gatherCircles(){
  btn_4.hide();
  btn_5.hide();
  t8.hide();
  var target = 215;
  for (let i = 0; i < circles.length; i++){

          circles[i].x = lerp(circles[i].x, target, 0.1);
          circles[i].y = lerp(circles[i].y, target, 0.1);
          ellipse(target, target,2,2,0.3);
      }

  var fingerPrintX = windowWidth/2-215,
   fingerPrintY = windowHeight/2-250,
   fingerPrintDrawnWidth = fingerprint.width * 1.8,
   fingerPrintDrawnHeight = fingerprint.height * 1.8
  // image(fingerprint, fingerPrintX, fingerPrintY, fingerPrintDrawnWidth, fingerPrintDrawnHeight)

   //playToneForRow(mouseY, width, '4n');
  var total = 8;
  var count = 0;


  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    if (circle.r > 5 && circle.r <7) {
      circle.alpha = random(100,255);
    }
    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (let j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d-5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show(fingerPrintX, fingerPrintY, fingerPrintDrawnWidth, fingerPrintDrawnHeight);
}
  let changeLast = setTimeout(finalText, 3000);
}

function finalText(){
    btn_4.hide();
    btn_5.hide();
    t8.hide();
    // playState = 6;


    if (count == 0){
    t9 = createElement('h2', 'Thank you');
    t9.class('t1');
    }
    count++;
}

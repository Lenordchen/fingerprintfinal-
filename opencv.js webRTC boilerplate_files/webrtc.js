// var img;
var circle = [];
var fingerprint;

const synth = new Tone.Synth();
synth.toMaster();
// var t = synth.triggerAttackRelease('C4', '8n');

 function preload(){
    fingerprint = loadImage('fingerprints/3.jpg');
  }

 function setup() {
   // create canvas
   var c = createCanvas(windowWidth, windowHeight);
   // c.parent('canvas');
   background(0);
   // loadImage('fingerprints/3.jpg', function(img){
   // fingerprint = image(img, windowWidth/2-180, windowHeight/2-250,
   //       img.width * 2, img.height * 2);
   image(img, windowWidth/2-180, windowHeight/2-250,
         img.width * 2, img.height * 2);
   filter(THRESHOLD);


   fingerprint.loadPixels();

   for(let i = 0; i < fingerprint.pixels.length; i+=4){
     let r = fingerprint.pixels[i];
     let g = fingerprint.pixels[i+1];
     let b = fingerprint.pixels[i+2];

     if (r === 255 && g === 255
         && b === 255) {
           r = 0;
           g = 0;
           b = 0;
        }
        else {
           r = 153;
           g = 233;
           b = 241;
        }
   }

   //filter(INVERT);

   // var ctx = c.getContext('2d');
   // var img = image(img, windowWidth/2-180, windowHeight/2-250,
   //       img.width * 2, img.height * 2);
   //     ctx.drawImage(img,)
   // var imageData = c.getImageData(windowWidth/2-180, windowHeight/2-250,
   //       c.width, c.height);
   // var i;
   // for (i = 0; i < imageData.data.length; i+=4){
   //   if(imageData.data[i] === 255 && imageData.data[i+1] ===255 &&
   //      imageData.data[i+2] === 255) {
   //        imageData.data[i] = 0;
   //        imageData.data[i+1] = 0;
   //        imageData.data[i+2] = 0;
   //      }
   //      else {
   //      imageData.data[i] = 153;
   //      imageData.data[i+1] = 233;
   //      imageData.data[i+2] = 241;
   //    }
   //  c.putImageData(imgData, windowWidth/2-180, windowHeight/2-250);

   // }

   // blendMode(DARKEST);
   // tint(153, 233, 241);
   //background(0);
   // // img(windowWidth/2-180, windowHeight/2-250, img.width * 2, img.height * 2);
   // fill(0,0,255);
   // rect(windowWidth/2-180, windowHeight/2-250,
   //       img.width * 2, img.height * 2)
   // rect(windowWidth/2-180, windowHeight/2-250, img.width * 2, img.height * 2);
   // // image(img, windowWidth/2, windowHeight/2, imgWidth, imgHeight);
   // fill(0,0,255,50);
   // rect(0,0,windowWidth/2-180, windowHeight/2-250, img.width * 2, img.height * 2);


    circle.push = new Circle(200,200,20);

    Tone.Transport.bpm.value = 120;
 }

 function draw() {
   image(img, windowWidth/2-180, windowHeight/2-250,
         img.width * 2, img.height * 2);
   // circle.show();
 }


function isPixelBlue(index) {
  // console.log(`(${pixels[index]},${pixels[index+1]},${pixels[index+2]})`);
  //img.pixels[]
  if (pixels[index] === 0 && pixels[index+1] === 0
     && pixels[index+2] === 0) {
    // Pixel is black
    // console.log("black");
    return false;
  }
  //console.log("blue");
  return true;
}

function howManyPixelsInARowAreBlue(y, imgWidth) {
  var count = 0;
  y = Math.trunc(y);
  for (var x = 0; x < imgWidth; x++) {
    var pixelIndex = (x + y * imgWidth) * 4;
    if (isPixelBlue(pixelIndex)) { // this pixel is blue
      count++;
    }
  }

  console.log(`${y} y count: ${count}`);
  return count;
}

function playToneForRow(y, imgWidth, time) {
  // minimum: 0, maximum: imgWidth
  var pixelIndex = (mouseX + mouseY * imgWidth) * 4;
  //console.log(pixelIndex);
  if (isPixelBlue(Math.trunc(pixelIndex))) { // this pixel is blue
    console.log("it's blue, play");
      var numberOfBluePixels = howManyPixelsInARowAreBlue(mouseY, imgWidth);

      // Midi tone numbers, starting at 24 for C1
      var midiNumber = numberOfBluePixels * 72 / imgWidth + 60;
      var note = Tone.Frequency.mtof(midiNumber);

  // var pixelIndex = (mouseX + mouseY * imgWidth) * 4;
  //   if (isPixelBlue(Math.trunc(pixelIndex))) { // this pixel is blue
        synth.triggerAttackRelease(note, '8n', time);
    }
}

 function imageLoaded() {

   // let imgWidth = Math.trunc(img.width/(img.height/windowHeight));
   // let imgHeight = windowHeight;
   // let imgWidth = img.width;
   // let imgHeight = img.height;
   // if (imgWidth > 0 && imgHeight > 0) {
   //   console.log(imgWidth);
   //   // resizeCanvas(imgWidth, imgHeight);
   // }


   // blendMode(MULTIPLY);
   // img.filter(INVERT);
   // tint(153, 233, 241);
   // // image(img, windowWidth/2, windowHeight/2, imgWidth, imgHeight);
   // fill(0,0,255,50);
   // rect(0,0,800,800);
   // console.log(img);

   //img.loadPixels();
   loadPixels();

   var y = 0;
   Tone.Transport.scheduleRepeat(function repeat(time) {
     if (y >= imgHeight) {
       // we passed the last row
       Tone.Transport.stop();
       return;
     }
     playToneForRow(y, imgWidth, time);
     y++;
   }, '4n');

   Tone.Transport.start();


 }

//  function gotFile(file) {
//    // If it's an image file
//    if (file.type === 'image') {
//      // Create an image DOM element but don't show it
//
//      // CREATIMG returns something that is not a p5.Image,
//      // functions like .filter and .loadpixels dont work with it
//      // following line taken from p5 website drap/drop example
//
//      // img = createImg(file.data, imageLoaded).hide();
//      img = loadImage(file.data, imageLoaded);//.hide()
//  }
// }

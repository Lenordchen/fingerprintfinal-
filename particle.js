function Circle(x, y, originalImageWidth, originalImageHeight) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.originalImageWidth = originalImageWidth
  this.originalImageHeight = originalImageHeight
  this.growing = true;
  this.alpha = random(20,255);

  this.grow = function() {
    if (this.growing) {
      if(this.r >=2 && this.r < 5) {
        this.r += 0.5;
        this.alpha -=10;
        }
      }
    }


  this.show = function(offsetX, offsetY, maxWidth, maxHeight) {
    noStroke();
    //stroke(255, 255, 255);
    //strokeWeight(2);
    fill(255, this.alpha);
    let change = 10-dist(mouseX, mouseY,
      map(this.x, 0, this.originalImageWidth, offsetX, offsetX + maxWidth),
      map(this.y, 0, this.originalImageHeight, offsetY, offsetY + maxHeight));
    if (change < -10 || change > 10) {
      change = 0;
      // change = random(change);
    }

    ellipse(
      map(this.x+change, 0, this.originalImageWidth, offsetX, offsetX + maxWidth),
      map(this.y+change, 0, this.originalImageHeight, offsetY, offsetY + maxHeight),
      this.r * 2,
      this.r * 2
    );
  }

  this.edges = function() {
    return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  }

  this.finished = function(){
    return alpha < 0
  }


}

function Star(x, y, r, trans,dtrans) {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.r = random(0,5);
  this.trans = random(0,2);
  this.dtrans = -0.02;



  this.show = function() {
    fill(220,220,220,map(this.trans, 0,1,0,255));
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }

  // this.transparancy = function() {
  //   this.trans += this.dtrans;
  // }

  this.fade = function() {
    if (this.r > 3 && this.r < 6) {
      this.trans += this.dtrans;
      if (this.trans < 0) {
        this.dtrans = -this.dtrans;
      } else if (this.trans > 1) {
        this.dtrans = -this.dtrans;

      }
    }
  //   if (this.trans < 0) {
  //     this.dtrans = -this.dtrans;
  //   } else if (this.trans > 1) {
  //     this.dtrans = -this.dtrans;
  //
  // }
 }
}

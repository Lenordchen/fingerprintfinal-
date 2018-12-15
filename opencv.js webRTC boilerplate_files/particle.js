class Circle {
  constructor (xx,yy,rr) {
    this.x = xx;
    this.y = yy;
    this.r = rr;
  }

  show (){
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r, this.r);
  }
}

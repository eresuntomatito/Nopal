let nopal = [];

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  let basePad = new NopalPad(null, createVector(width / 2, height), -90, 60, 0);
  nopal.push(basePad);
}

function draw() {
  background(220);

  drawEnvironment();
  
  for (let pad of nopal) {
    pad.update();
    pad.show();
  }
}

function drawEnvironment() {
  // Add code to draw sky, sun, clouds, and desert landscape
}

class NopalPad {
  constructor(parent, pos, angle, size, growth) {
    this.parent = parent;
    this.initialPos = pos.copy();
    this.pos = pos.copy();
    this.angle = angle;
    this.size = size;
    this.maxSize = random(50, 100);
    this.growthRate = 0.5;
    this.branchingThreshold = 0.75;
    this.childPadCreated = false;
  }

  update() {
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
    }

    if (this.parent) {
      this.pos = this.computeNewPosition();
    }

    if (!this.childPadCreated && this.size / this.maxSize > this.branchingThreshold) {
      this.createChildPads();
      this.childPadCreated = true;
    }
  }

  createChildPads() {
    let newPos = this.getTopEdgePosition();
    let leftPad = new NopalPad(
      this,
      newPos,
      this.angle - random(30, 60),
      10,
      this.growth + 1
    );
    let rightPad = new NopalPad(
      this,
      newPos,
      this.angle + random(30, 60),
      10,
      this.growth + 1
    );
    nopal.push(leftPad);
    nopal.push(rightPad);
  }

  computeNewPosition() {
    let edgeVector = p5.Vector.fromAngle(radians(this.angle), -this.size / 2);
    let newPosition = p5.Vector.add(this.initialPos, edgeVector);
    return newPosition;
  }

  getTopEdgePosition() {
    let edgeVector = p5.Vector.fromAngle(radians(this.angle), -this.size / 2);
    let edgePosition = p5.Vector.add(this.pos, edgeVector);
    return edgePosition;
  }

  show() {
    push();
    stroke(0);
    fill(0, 200, 0);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    ellipse(0, -this.size / 2, this.size * 0.7, this.size);
    pop();
  }
}


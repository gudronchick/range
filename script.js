const canv = document.querySelector("canvas");
const context = canv.getContext("2d");
let isActive = false;
let isRight = false;

canv.width = window.innerWidth;
canv.height = window.innerHeight;

const createRange = () => {
  context.beginPath();
  context.fillStyle = "pink";
  context.fillRect(200, 200, 300, 25);
  context.fill();
};

createRange();

class Range {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  drawLine() {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, 10, 45);
    context.fill();
  }

  lineMovement(x) {
    x = Math.floor(x);
    console.log(x);
    if (x < 200) {
      leftCoords.x = x = 200;
    }
    if (x > 500) {
      rightCoords.x = x = 500;
    }
    this.x = x;
  }

  drawText() {
    context.beginPath();
    context.fillStyle = "white";
    context.font = "20px sans-serif";
    context.fillText(this.x - 200, this.x - 8, this.y - 20);
    context.fill();
  }
}

let leftCoords = {
  x: 220,
  y: 190,
  color: "red",
};

let rightCoords = {
  x: 380,
  y: 190,
  color: "red",
};

let left = new Range(leftCoords.x, leftCoords.y, leftCoords.color);
let right = new Range(rightCoords.x, rightCoords.y, rightCoords.color);

left.drawLine();
right.drawLine();
right.drawText();
left.drawText();

let arr = [left, right];

document.addEventListener("mousedown", (e) => {
  for (let i = 0; i < arr.length; i++) {
    if (
      e.pageX >= arr[i].x &&
      e.pageX <= arr[i].x + 8 &&
      e.pageY >= arr[i].y &&
      e.pageY <= arr[i].y + 45
    ) {
      isRight = i ? true : false;
      isActive = true;
    }
  }
});

document.addEventListener("mouseup", (e) => {
  isActive = false;
  context.clearRect(0, 0, canv.width, canv.height);
  createRange();
  right.drawLine();
  left.drawLine();
  left.drawText();
  right.drawText();
});

document.addEventListener("mousemove", (e) => {
  if (isActive) {
    context.clearRect(0, 0, canv.width, canv.height);
    createRange();
    right.drawLine();
    left.drawLine();
    left.drawText();
    right.drawText();

    if (isRight) {
      rightCoords.x = e.pageX;
      if (rightCoords.x - 20 < leftCoords.x) {
        rightCoords.x = leftCoords.x + 20;
      }
      right.lineMovement(rightCoords.x);
    } else {
      leftCoords.x = e.pageX;
      if (leftCoords.x + 20 > rightCoords.x) {
        leftCoords.x = rightCoords.x - 20;
      }
      left.lineMovement(leftCoords.x);
    }
  }
});

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let colors = [
  "#fbf8cc",
  "#fde4cf",
  "#ffcfd2",
  "#f1c0e8",
  "#cfbaf0",
  "#a3c4f3",
  "#90dbf4",
  "#8eecf5",
  "#98f5e1",
  "#b9fbc0",
];

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (event) => {
  console.log(event);
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

const randomNumberWithRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const randomColor = (colorsArr) => {
  return colorsArr[Math.floor(Math.random() * colorsArr.length)];
};

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  //Pythagoras Theorem
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };

    this.update = () => {
      this.draw();
    };
  }
}

let circle1;
let circle2;

const init = () => {
  circle1 = new Circle(300, 300, 100, "black");
  circle2 = new Circle(undefined, undefined, 30, "#98f5e1");
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  if (
    getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <
    circle1.radius + circle2.radius
  ) {
    circle1.color = "#fde4cf";
  } else {
    circle1.color = "black";
  }
};

init();
animate();

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

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

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

const getRandomNumberWithRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const getRandomColor = (colorsArr) => {
  return colorsArr[Math.floor(Math.random() * colorsArr.length)];
};

const getDistance = (x1, x2, y1, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

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

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

const getRandomIntWithRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const getRandomColor = (colorsArr) => {
  return colorsArr[Math.floor(Math.random() * colorsArr.length)];
};

const distance = (x1, x2, y1, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    };
    this.radius = radius;
    this.color = color;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    };

    this.update = (circles) => {
      this.draw();

      for (let i = 0; i < circles.length; i++) {
        if (this === circles[i]) continue;
        if (
          distance(this.x, this.y, circles[i].x, circles[i].y) -
            this.radius * 2 <
          0
        ) {
          console.log("has collided");
        }
      }

      if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
        this.velocity.x = -this.velocity.x;
      }

      if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
        this.velocity.y = -this.velocity.y;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    };
  }
}
let circleArr = [];
const init = () => {
  circleArr = [];
  for (let i = 0; i < 4; i++) {
    let radius = 100;
    let x = getRandomIntWithRange(radius, canvas.width - radius);
    let y = getRandomIntWithRange(radius, canvas.height - radius);
    let color = getRandomColor(colors);
    if (circleArr.length >= 1) {
      for (let j = 0; j < circleArr.length; j++) {
        if (distance(x, y, circleArr[j].x, circleArr[j].y) - radius * 2 < 0) {
          x = getRandomIntWithRange(radius, innerWidth - radius);
          y = getRandomIntWithRange(radius, innerHeight - radius);

          j = -1;
          continue;
        }
      }
    }
    circleArr.push(new Circle(x, y, radius, "blue"));
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circleArr.forEach((circle) => {
    circle.update(circleArr);
  });
};

init();
animate();

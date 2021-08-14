export default class Circle {
  VW = 0;
  VH = 0;
  ctx = null;
  x = 0;
  y = 0;
  dx = 1;
  dy = 1;
  radius = 0;
  color = 'black';
  velocity = { x: 1, y: 1 };
  alpha = 1;

  constructor(ctx, vw, vh, radius) {
    this.ctx = ctx;
    this.VW = vw;
    this.VH = vh;
    this.radius = radius;
  }

  position(x, y) {
    this.x = x;
    this.y = y;

    return this;
  }

  speed(dx, dy) {
    this.dx = dx;
    this.dy = dy;

    return this;
  }

  setColor(color) {
    this.color = color;

    return this;
  }

  setVelocity(x, y) {
    this.velocity = { x, y };
    return this;
  }

  draw() {
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    return this;
  }

  animate() {
    if (this.x > this.VW - this.radius || this.x < this.radius) {
      this.dx = -this.dx;
    }

    if (this.y > this.VH - this.radius || this.y < this.radius) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    return this;
  }
}
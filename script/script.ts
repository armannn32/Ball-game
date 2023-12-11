const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");
const W: number = canvas?.width || 0;
const H: number = canvas?.height || 0;
const gravity: number = 0.5;
const bounceFactor: number = 0.7;
let color: string;
const ballCount: HTMLHeadingElement | null = document.getElementById("ballCount") as HTMLHeadingElement | null;


class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;

  constructor(x: number, y: number, color: string, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
  }

  draw(): void {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      this.creationTime = Date.now();
    }
  }
  creationTime: number;

  update(): void {
    const elapsedTime = Date.now() - this.creationTime;

    this.y += this.vy;
    this.vy += gravity;

    if (elapsedTime > 5000) {
      this.vy *= 0.99;
    }

    if (Math.abs(this.vy) < 3 && this.y + this.radius > H) {
      this.y = H - this.radius;
      this.vy = 0;
    } else if (this.y + this.radius > H) {
      this.y = H - this.radius;
      this.vy *= -bounceFactor;
    }
  }
}

function clearCanvas(): void {
  if (ctx) {
    ctx.clearRect(0, 0, W, H);
  }
}

const balls: Ball[] = [];

if (canvas) {
  canvas.addEventListener("click", function (event: MouseEvent) {
    const randomComponent = () => Math.floor(Math.random() * 256);
    const r = randomComponent();
    const g = randomComponent();
    const b = randomComponent();
    let color = "rgb(" + r + "," + g + "," + b + ")";
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    balls.push(new Ball(x, y, color, 30));
    ballCount.innerText = balls.length.toString() + " Balls"
  });
}

(function update(): void {
  clearCanvas();

  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  requestAnimationFrame(update);
})();

function clearBalls() {
  balls.length = 0;
  ballCount.innerText = "0 Balls"

}
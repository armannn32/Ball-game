var canvas = document.getElementById("canvas");
var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var W = (canvas === null || canvas === void 0 ? void 0 : canvas.width) || 0;
var H = (canvas === null || canvas === void 0 ? void 0 : canvas.height) || 0;
var gravity = 0.5;
var bounceFactor = 0.7;
var color;
var ballCount = document.getElementById("ballCount");
var Ball = /** @class */ (function () {
    function Ball(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
    }
    Ball.prototype.draw = function () {
        if (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
            this.creationTime = Date.now();
        }
    };
    Ball.prototype.update = function () {
        var elapsedTime = Date.now() - this.creationTime;
        this.y += this.vy;
        this.vy += gravity;
        if (elapsedTime > 5000) {
            this.vy *= 0.99;
        }
        if (Math.abs(this.vy) < 3 && this.y + this.radius > H) {
            this.y = H - this.radius;
            this.vy = 0;
        }
        else if (this.y + this.radius > H) {
            this.y = H - this.radius;
            this.vy *= -bounceFactor;
        }
    };
    return Ball;
}());
function clearCanvas() {
    if (ctx) {
        ctx.clearRect(0, 0, W, H);
    }
}
var balls = [];
if (canvas) {
    canvas.addEventListener("click", function (event) {
        var randomComponent = function () { return Math.floor(Math.random() * 256); };
        var r = randomComponent();
        var g = randomComponent();
        var b = randomComponent();
        var color = "rgb(" + r + "," + g + "," + b + ")";
        var rect = this.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        balls.push(new Ball(x, y, color, 30));
        ballCount.innerText = balls.length.toString() + " Balls";
    });
}
(function update() {
    clearCanvas();
    for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
        var ball = balls_1[_i];
        ball.draw();
        ball.update();
    }
    requestAnimationFrame(update);
})();
function clearBalls() {
    balls.length = 0;
    ballCount.innerText = "0 Balls";
}

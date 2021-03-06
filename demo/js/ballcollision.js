var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	balls = [],
	minRadius = 5,
	maxRadius = 20,
	numBalls = 30,
	friction = -0.002,
	bounce = -1;

for (var ball, r, color, i = 0; i < numBalls; i++) {
	r = Math.floor(random(minRadius, maxRadius));
	// color=randomColor();
	var hsl = randomHsl();
	color = `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
	// color=`hsl(${hsl[0]},50%,50%)`
	ball = new Ball(r, color);
	ball.mass = r;
	ball.x = random(r, W - r);
	ball.y = random(r, H - r);
	ball.vx = random(-5, 5);
	ball.vy = random(-5, 5);
	balls.push(ball);
}

function checkWall(ball) {
	if (ball.x < ball.radius) {
		ball.x = ball.radius;
		ball.vx *= bounce;
	}
	if (ball.x > W - ball.radius) {
		ball.x = W - ball.radius;
		ball.vx *= bounce;
	}

	if (ball.y < ball.radius) {
		ball.y = ball.radius;
		ball.vy *= bounce;
	}
	if (ball.y > H - ball.radius) {
		ball.y = H - ball.radius;
		ball.vy *= bounce;
	}
}

function rotate(x, y, sin, cos, reverse) {
	return {
		x: reverse ? x * cos + y * sin : x * cos - y * sin,
		y: reverse ? y * cos - x * sin : y * cos + x * sin
	};
}

function checkCollision(ballA, i) {
	for (var ballB, dis, j = i + 1; j < numBalls; j++) {
		ballB = balls[j];
		// ballA.vx*=bounce;
		// ballA.vy*=bounce;
		// ballB.vx*=bounce;
		// ballB.vy*=bounce;
		checkMessAngle(ballA, ballB);
	}
}

/**
 * 角度碰撞 和 能量守恒和动量守恒
 * @return {[type]} [description]
 */
function checkMessAngle(ball0, ball1) {
	var dx = ball1.x - ball0.x,
		dy = ball1.y - ball0.y,
		dist = Math.sqrt(dx * dx + dy * dy);

	if (dist < ball0.radius + ball1.radius) {
		var angle = Math.atan2(dy, dx),
			sin = Math.sin(angle),
			cos = Math.cos(angle);

		//rotate ball0 position
		var pos0 = { x: 0, y: 0 };

		//rotate ball1 position
		var pos1 = rotate(dx, dy, sin, cos, true);

		//rotate ball0 velocity
		var vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true);

		//rotate ball1 velcoity
		var vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true);

		//collision reaction
		var vxTotal = vel0.x - vel1.x;

		vel0.x =
			((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
			(ball0.mass + ball1.mass);
		vel1.x = vxTotal + vel0.x;

		//update position - to avoid objects becoming stuck together
		var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
			overlap = ball0.radius + ball1.radius - Math.abs(pos0.x - pos1.x);
		//update position
		pos0.x += (vel0.x / absV) * overlap;
		pos1.x += (vel1.x / absV) * overlap;

		//rotate everything back
		var pos0F = rotate(pos0.x, pos0.y, sin, cos, false);
		var pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

		//adjust position to actual screen position
		ball1.x = ball0.x + pos1F.x;
		ball1.y = ball0.y + pos1F.y;
		ball0.x = ball0.x + pos0F.x;
		ball0.y = ball0.y + pos0F.y;

		//rotate velocity back
		var vel0F = rotate(vel0.x, vel0.y, sin, cos, false);
		var vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

		ball0.vx = vel0F.x;
		ball0.vy = vel0F.y;
		ball1.vx = vel1F.x;
		ball1.vy = vel1F.y;
	}
}

// 反弹处理
function rebound(ballA, ballB) {
	var rc = Math.sqrt(
		Math.pow(ballA.x - ballB.x, 2) + Math.pow(ballA.y - ballB.y, 2)
	);
	//获取碰撞后的速度增量
	var ax =
		((ballA.vx - ballB.vx) * Math.pow(ballA.x - ballB.x, 2) +
			(ballA.vy - ballB.vy) * (ballA.x - ballB.x) * (ballA.y - ballB.y)) /
		Math.pow(rc, 2);
	var ay =
		((ballA.vy - ballB.vy) * Math.pow(ballA.y - ballB.y, 2) +
			(ballA.vx - ballB.vx) * (ballA.x - ballB.x) * (ballA.y - ballB.y)) /
		Math.pow(rc, 2); //将速度增量赋给碰撞小球
	ballA.vx = ballA.vx - ax;
	ballA.vy = ballA.vy - ay;
	ballB.vx = ballB.vx + ax;
	ballB.vy = ballB.vy + ay; //修正小球碰撞距离，避免两球粘在一起
	var clength = (ballA.radius + ballB.radius - rc) / 2;
	var cx = (clength * (ballA.x - ballB.x)) / rc;
	var cy = (clength * (ballA.y - ballB.y)) / rc;
	ballA.x += cx;
	ballA.y += cy;
	ballB.x -= cx;
	ballB.y -= cy;
}

function update(ball) {
	//添加简单摩擦力
	ball.vx += ball.vx * friction;
	ball.vy += ball.vy * friction;

	ball.x += ball.vx;
	ball.y += ball.vy;
}

function draw(ball) {
	ball.draw(ctx);
}

(function animate() {
	ctx.clearRect(0, 0, W, H);
	balls.forEach((ball, i) => {
		checkWall(ball);
		checkCollision(ball, i);
	});
	balls.forEach(update);
	balls.forEach(draw);
	requestAnimationFrame(animate);
})();

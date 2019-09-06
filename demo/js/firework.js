var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	points = [];
ctx.globalCompositeOperation = "source-over";
ctx.fillStyle = "rgba(0,0,9,0.1)";
ctx.fillRect(0, 0, W, H);
ctx.translate(W / 2, H);

class Ball {
	constructor(sx, sy, dx, dy, s, d) {
		this.sx = sx;
		this.sy = sy;
		this.dx = dx;
		this.dy = dy;
		this.x = sx;
		this.y = sy;
		this.s = s;
		this.d = d;
	}
	update(c) {
		this.x = Tween.Linear(c, this.sx, this.dx - this.sx, this.d);
		this.y = Tween.Linear(c, this.sy, this.dy - this.sy, this.d);
	}
	draw(ctx) {
		var rdGradient = ctx.createRadialGradient(
			this.x,
			this.y,
			0,
			this.x,
			this.y,
			5
		);
		rdGradient.addColorStop(0, "#fff");
		rdGradient.addColorStop(0.5, "#fff");
		rdGradient.addColorStop(0.7, "#ff0");
		rdGradient.addColorStop(1, "#f30");
		ctx.fillStyle = rdGradient;
		ctx.shadowColor = "#f30";
		ctx.shadowblur = 5;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
		ctx.fill();
	}
}
class Piece {
	constructor(sx, sy, s, d, angle, l, color) {
		this.sx = sx;
		this.sy = sy;
		this.x = 0;
		this.y = 0;
		this.s = s;
		this.d = d;
		this.l = l;
		this.color = color;
		this.angle = angle;
	}
	update(c) {
		this.x = Tween.Quart.easeInOut(c, 0, this.l, this.d);
	}
	draw(ctx) {
		ctx.save();
		ctx.translate(this.sx, this.sy);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}
}
class Piece2 {
	constructor(sx, sy, dx, dy, s, d, color) {
		this.sx = sx;
		this.sy = sy;
		this.dx = dx;
		this.dy = dy;
		this.x = 0;
		this.y = 0;
		this.s = s;
		this.d = d;
		this.color = color;
	}
	update(c) {
		this.x = Tween.Quart.easeInOut(c, 0, this.dx, this.d);
		this.y = Tween.Quart.easeInOut(c, 0, this.dy, this.d);
	}
	draw(ctx) {
		var color = `rgba(${this.color.r},${this.color.g},${this.color.b},0.9)`;
		ctx.save();
		ctx.translate(this.sx, this.sy);
		ctx.fillStyle = color;
		ctx.shadowColor = color;
		ctx.shadowblur = 5;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}
}
function boom(x, y) {
	var ag = 0,
		color = "#fff";
	for (var i = 0; i < 30; i++) {
		ag = ((Math.PI * 2) / 30) * i;
		color = "#" + Math.ceil(Math.random() * 16777215).toString(16);
		points.push(new Piece(x, y, new Date(), 2000, ag, 150, color));
	}

	for (var i = 0; i < 80; i++) {
		var color = {
				r: Math.floor(Math.random() * 150 + 100),
				g: Math.floor(Math.random() * 150 + 100),
				b: Math.floor(Math.random() * 150 + 100)
			},
			dx = Math.round(Math.random() * 360 - 180),
			dy = Math.round(Math.random() * 360 - 180);
		points.push(new Piece2(x, y, dx, dy, new Date(), 2000, color));
	}
}

setInterval(function() {
	var x = Math.round(Math.random() * 400 - 200),
		y = -30,
		dx = Math.round(Math.random() * 400 - 200),
		dy = Math.round(Math.random() * 100 + 200 - H);
	points.push(new Ball(x, y, dx, dy, new Date(), 1500));
}, 700);

(function animate() {
	var point = null,
		c = 300;
	function run() {
		ctx.fillRect(-W / 2, -H, W, H);
		for (var i = 0; i < points.length; i++) {
			point = points[i];
			c = new Date() - point.s;
			if (c > point.d) {
				points.splice(i--, 1);
				if (point instanceof Ball) {
					boom(point.dx, point.dy);
				}
			}
			ctx.save();
			point.update(c);
			// ctx.globalCompositeOperation = "lighter";
			point.draw(ctx);
			ctx.restore();
		}
		requestAnimationFrame(run);
	}
	run();
})();

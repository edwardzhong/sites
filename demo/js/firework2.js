var stats = new Stats(),
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	j = 0,
	points = [],
	fires = [];
ctx.globalCompositeOperation = "source-over";
ctx.fillStyle = "rgba(0,0,9,1)";
ctx.fillRect(0, 0, W, H);
ctx.translate(W / 2, H);

stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

class Launch {
	constructor(time, duration) {
		this.x = Math.round(random(-150, 150));
		this.y = -30;
		this.vx = random(-3, 3);
		this.vy = random(-12, -20);
		this.startTime = time;
		this.visible = true;
		this.duration = duration;
		this.trail = [];
	}
	update() {
		var t = new Date() - this.startTime;
		this.vy += 0.1;
		this.x += (this.vx * t) / 1000;
		this.y += (this.vy * t) / 1000;
		this.trail.unshift(Object.assign({}, this));
		this.trail.length = Math.min(this.trail.length, 20);

		if (t > this.duration || this.y < 100 - H) {
			this.visible = false;
		}
	}
	draw(ctx) {
		ctx.save();
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
		// ctx.shadowColor='#f30'
		// ctx.shadowblur=5;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}
	drawTrail(ctx) {
		ctx.save();
		ctx.beginPath();
		this.trail.forEach((p, i) => {
			ctx.globalAlpha = 0.2 - 0.01 * i;
			ctx.lineWidth = 10 - 0.3 * i;
			ctx.strokeStyle = "hsla(20,100%," + (50 + i) + "%,1)";
			ctx[i == 0 ? "moveTo" : "lineTo"](p.x, p.y);
			ctx.stroke();
		});
		ctx.restore();
	}
}
class Piece {
	constructor(x, y, color, time) {
		var v = random(15, 20),
			Pr2 = 2 * Math.PI * Math.random(),
			Pr = Math.PI * Math.random();
		this.vx = Math.sin(Pr2) * Math.sin(Pr) * v;
		this.vy = Math.cos(Pr) * v;
		this.x = x;
		this.y = y;
		this.x1 = x;
		this.y1 = y;

		this.color = color;
		this.duration = 1000;
		this.visible = true;
		this.startTime = time;
		this.trail = [];
	}
	update() {
		this.vy += 0.2; //重力
		this.vx /= 1.075;
		this.vz /= 1.075;
		this.vy /= 1.075;
		this.x += this.vx;
		this.y += this.vy;
		this.x1 = this.x;
		this.y1 = this.y;
		this.trail.unshift(Object.assign({}, this));
		this.trail.length = Math.min(this.trail.length, 15);
		this.visible = true;
		if (new Date() - this.startTime > this.duration || this.y1 > H - 100) {
			this.visible = false;
		}
	}
	draw(ctx) {
		ctx.save();
		ctx.translate(this.x1, this.y1);
		ctx.globalCompositeOperation = "lighter";
		var rdGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 5);
		rdGradient.addColorStop(
			0,
			`hsla(${this.color[0]},${this.color[1]}%,100%,1)`
		);
		rdGradient.addColorStop(
			0.5,
			`hsla(${this.color[0]},${this.color[1]}%,50%,.9)`
		);
		rdGradient.addColorStop(
			1,
			`hsla(${this.color[0]},${this.color[1]}%,80%,0)`
		);
		ctx.fillStyle = rdGradient;
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}
	drawTrail(ctx) {
		ctx.save();
		ctx.beginPath();
		this.trail.forEach((p, i) => {
			ctx.lineWidth = 8 - i * 0.8;
			ctx.strokeStyle = `hsla(${this.color[0]},${this.color[1]}%,${40 +
				i * 5}%,${0.06 - i * 0.003})`;
			ctx[i == 0 ? "moveTo" : "lineTo"](p.x, p.y);
			ctx.stroke();
		});
		ctx.restore();
	}
}

function boom(x, y, color) {
	for (var i = 0; i < 100; i++) {
		fires.push(new Piece(x, y, color || randomHsl(), new Date()));
	}
}

setInterval(function() {
	points.push(new Launch(new Date(), 1500));
}, 1000);

(function animate() {
	stats.begin();
	ctx.fillRect(-W / 2, -H, W, H);
	for (var i = 0, p; i < points.length; i++) {
		j++;
		p = points[i];
		p.update();
		if (!p.visible) {
			points.splice(i--, 1);
			boom(p.x, p.y, j % 2 ? randomHsl() : "");
		} else {
			p.drawTrail(ctx);
			p.draw(ctx);
		}
	}
	for (var i = 0, p; i < fires.length; i++) {
		p = fires[i];
		p.update();
		if (!p.visible) {
			fires.splice(i--, 1);
		}
		p.drawTrail(ctx);
		p.draw(ctx);
	}
	stats.end();
	requestAnimationFrame(animate);
})();

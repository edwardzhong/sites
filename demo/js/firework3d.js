var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth,
	H =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight,
	Nums = 1600,
	Fires = [],
	Points = [],
	Z = 0,
	ZIndex = 300,
	L = Math.floor(Math.sqrt(Nums)),
	S = 40,
	LEFT = (W - L * S) / 2;

// 设置style.width,style.height会拉伸，必须设置canvas的width,height属性才不会拉伸
canvas.width = W;
canvas.height = H;
ctx.fillStyle = "hsla(0,0%,0%,1)";
ctx.lineWidth = 1;
ctx.translate(W / 2, H / 2);

class Point {
	constructor(x, y, z, color) {
		this.x = x - W / 2;
		this.y = y - H / 2;
		this.z = z;
		this.x1 = x;
		this.y1 = y;
		this.r = 2;
		this.color = color;
		this.visible = true;
	}
	rotateY(angleY) {
		var cos = Math.cos(angleY),
			sin = Math.sin(angleY),
			x = this.x * cos - this.z * sin,
			z = this.z * cos + this.x * sin;
		this.x = x;
		this.z = z;
	}
	update() {
		// 绕y轴旋转
		this.rotateY(Math.PI / 180);
		// 然后绕x旋转（180/12）度
		// var pos=rotateX({y:this.y,z:this.z},Math.PI/12);

		// 注意比例问题，重要
		var scale = ZIndex / (this.z + ZIndex);
		this.x1 = this.x * scale;
		this.y1 = this.y * scale;
		this.visible = this.z < -ZIndex ? false : true;
	}
	draw(ctx) {
		// ctx.save();
		ctx.beginPath();
		// ctx.fillStyle=this.color;
		ctx.arc(this.x1, this.y1, this.r, 0, Math.PI * 2, false);
		ctx.fill();
		// ctx.restore();
	}
}
for (var i = 0; i < Nums; i++) {
	var col = i % L,
		row = Math.floor(i / L),
		x = col * S + LEFT,
		y = H - 10,
		z = row * S - 800,
		color = "hsla(" + i + ",100%," + (40 + Math.floor(i / 30)) + "%,1)";

	Points.push(new Point(x, y, z, color));
}

function update(p, i) {
	p.update();
}

function draw(p, i) {
	if (p.visible) {
		p.draw(ctx);
	}
}

class Piece {
	constructor(x, y, z, color, time) {
		var v = random(15, 20),
			Pr2 = 2 * Math.PI * Math.random(),
			Pr = Math.PI * Math.random();
		this.vx = Math.sin(Pr2) * Math.sin(Pr) * v;
		this.vz = Math.cos(Pr2) * Math.sin(Pr) * v;
		this.vy = Math.cos(Pr) * v;
		this.x = x;
		this.y = y;
		this.z = z;
		this.x1 = x;
		this.y1 = y;

		this.color = color;
		this.duration = 1000;
		this.visible = true;
		this.startTime = time;
		this.trail = [];
	}
	rotateY(angleY) {
		var cos = Math.cos(angleY),
			sin = Math.sin(angleY),
			x = this.x * cos - this.z * sin,
			z = this.z * cos + this.x * sin;
		this.x = x;
		this.z = z;
	}
	update() {
		this.vy += 0.2; //重力
		this.vx /= 1.075;
		this.vz /= 1.075;
		this.vy /= 1.075;
		this.x += this.vx;
		this.y += this.vy;
		this.z += this.vz;
		this.rotateY(Math.PI / 180);

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
		// ctx.globalCompositeOperation = "lighter";
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
		// ctx.shadowColor=`hsla(${this.color[0]},${this.color[1]}%,50%,0.9)`
		// ctx.shadowblur=20;
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}
	drawTrail(ctx) {
		ctx.save();
		// ctx.globalAlpha=0.1;
		ctx.beginPath();
		this.trail.forEach((p, i) => {
			var pos = rotateY({ x: p.x, z: p.z }, (Math.PI / 180) * i);
			ctx.lineWidth = 8 - i * 0.8;
			ctx.strokeStyle = `hsla(${this.color[0]},${this.color[1]}%,${40 +
				i * 5}%,${0.06 - i * 0.003})`;
			ctx[i == 0 ? "moveTo" : "lineTo"](pos.x, p.y);
			ctx.stroke();
		});
		ctx.restore();
	}
}

(function fire() {
	var x = random(-300, 300),
		y = random(-400, -50),
		z = random(-400, 400),
		color = randomHsl();
	for (var i = 0; i < 100; i++) {
		Fires.push(new Piece(x, y, z, color, new Date()));
	}
	setTimeout(fire, 800);
})();

(function animate() {
	ctx.fillRect(-W / 2, -H / 2, W, H);
	Points.forEach(update);
	ctx.save();
	var rdGradient = ctx.createRadialGradient(0, 1500, 1400, 0, H / 2, 0);
	rdGradient.addColorStop(0, "#000");
	rdGradient.addColorStop(0.1, "hsla(250,100%,60%,1)");
	rdGradient.addColorStop(0.4, "hsla(0,100%,60%,1)");
	rdGradient.addColorStop(0.6, "hsla(60,100%,60%,1)");
	rdGradient.addColorStop(1, "#fff");
	ctx.fillStyle = rdGradient;
	Points.forEach(draw);
	ctx.restore();

	for (var i = 0, p; i < Fires.length; i++) {
		p = Fires[i];
		p.update();
		if (!p.visible) {
			Fires.splice(i--, 1);
		}
		p.drawTrail(ctx);
		p.draw(ctx);
	}
	requestAnimationFrame(animate);
})();

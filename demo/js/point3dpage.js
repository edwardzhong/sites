var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	mouse = captureMouse(canvas);
(points = []), (nums = 50);

ctx.lineWidth = 1;
ctx.strokeStyle = "#aaa";
for (var i = 0; i < nums; i++) {
	var x = random(-200, 200),
		y = random(-200, 200),
		z = random(-200, 200),
		p = new Point3d(x, y, z);
	points.push(p);
}

function update(p, i) {
	var angleX = (mouse.y - H / 2) * 0.0001;
	var angleY = (mouse.x - W / 2) * 0.0001;

	p.rotateY(angleY);
	p.rotateX(angleX);
}

function draw() {
	ctx.beginPath();
	points.forEach((p, i) => {
		ctx[i == 0 ? "moveTo" : "lineTo"](W / 2 + p.x, H / 2 + p.y);
	});
	ctx.stroke();
}

(function animate() {
	ctx.clearRect(0, 0, W, H);
	points.forEach(update);
	draw();
	requestAnimationFrame(animate);
})();

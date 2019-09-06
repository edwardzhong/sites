var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = canvas.width,
	H = canvas.height,
	isRunning = false,
	tweenType = "linear",
	easeType = "easeIn";

ctx.lineWidth = 2;

document.getElementById("tween").addEventListener("click", clickFn, false);
document.getElementById("ease").addEventListener("click", clickFn, false);

function fnName(t, e) {
	return typeof Tween[t] == "function" ? Tween[t] : Tween[t][e];
}

function clickFn(e) {
	e = e || window.event;
	node = e.target || e.srcElement;
	if (node.nodeName != "INPUT") return;
	if (node.name == "tween") {
		tweenType = node.value;
	} else {
		easeType = node.value;
	}
	draw(fnName(tweenType, easeType));
}

function draw(fn) {
	if (isRunning) return;
	var start = new Date(),
		duration = 1000,
		yLen = 300,
		xLen = 500,
		space = xLen / duration,
		y = 0,
		pos = [],
		t,
		gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);

	gradient.addColorStop(0, "hsl(200,100%,85%)");
	gradient.addColorStop(1, "hsl(200,100%,50%)");

	ctx.clearRect(0, 0, W, H);
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "hsl(200,50%,50%)";
	ctx.moveTo(10, 150);
	ctx.lineTo(10, 450);
	ctx.lineTo(510, 450);
	ctx.lineTo(510, 150);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();

	function orbit() {
		ctx.save();
		ctx.translate(10, 450);
		ctx.strokeStyle = "hsl(30,100%,50%)";
		ctx.beginPath();
		ctx.clearRect(0, -450, 500, 149);
		ctx.clearRect(0, -300, 500, 300);
		ctx.clearRect(0, 1, 500, 150);
		ctx.moveTo(0, 0);
		pos.forEach(function(n, i) {
			ctx.lineTo(n.x, n.y);
		});
		ctx.stroke();
		ctx.restore();
	}

	function ball(y) {
		ctx.save();
		ctx.clearRect(520, 0, 90, 600);
		ctx.translate(540, 450 - y);
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(0, 0, 15, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}

	~(function animate() {
		isRunning = true;
		t = new Date() - start;
		if (t > duration) {
			pos.push({ x: xLen, y: -yLen });
			orbit();
			ball(yLen);
			isRunning = false;
			return;
		}
		y = fn(t, 0, yLen, duration);
		pos.push({ x: t * space, y: -y });
		orbit();
		ball(y);
		requestAnimationFrame(animate);
	})();
}

document.getElementsByName("tween")[0].click();

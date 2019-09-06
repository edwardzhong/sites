var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var H = canvas.height;
var W = canvas.width;
var points = [];
var isDraw = false;
var imgData = null;

ctx.lineWidth = 0.5;
ctx.fillStyle = "hsla(0,100%,50%,.3)";
ctx.strokeStyle = "hsl(0,100%,50%)";

canvas.addEventListener(
	"mousedown",
	function(e) {
		var pos = windowToCanvas(canvas, e.clientX, e.clientY);
		points.push(pos);
		isDraw = true;
		canvas.style.cursor = "crosshair";
	},
	false
);

canvas.addEventListener(
	"mousemove",
	function(e) {
		if (!isDraw) return;
		var pos = windowToCanvas(canvas, e.clientX, e.clientY);
		ctx.save();
		ctx.beginPath();
		points.forEach((p, i) => {
			ctx[i != 0 ? "lineTo" : "moveTo"](p.x, p.y);
		});
		ctx.lineTo(pos.x, pos.y);
		clear();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	},
	false
);

document.onkeydown = function(e) {
	if (e.keyCode == 13) {
		canvas.style.cursor = "pointer";
		isDraw = false;
		points = [];
		imgData = ctx.getImageData(0, 0, W, H);
		ctx.putImageData(imgData, 0, 0);
	}
};
document.getElementById("btn").onclick = function(e) {
	ctx.clearRect(0, 0, W, H);
	imgData = null;
	isDraw = false;
};
function clear() {
	if (imgData) {
		restoreImageData();
	} else {
		ctx.clearRect(0, 0, W, H);
	}
}
function saveImageData() {
	imgData = ctx.getImageData(0, 0, W, H);
}
function restoreImageData() {
	ctx.putImageData(imgData, 0, 0);
}
function windowToCanvas(canvas, x, y) {
	if (!canvas) {
		console.log("canvas not exist");
		return { x: 0, y: 0 };
	}
	var box = canvas.getBoundingClientRect();
	return {
		x: x - box.left * (canvas.width / box.width),
		y: y - box.top * (canvas.height / box.height)
	};
}

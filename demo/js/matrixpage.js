var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	W = 800,
	H = 600,
	TW = 30,
	TH = 24,
	xl = Math.floor(W / TW),
	yl = Math.floor(H / TH),
	x = 0,
	y = 0,
	arr = new Array(xl).join(0).split(""),
	text = "";

canvas.width = W;
canvas.height = H;
ctx.textAlign = "left";
ctx.textBaseLine = "bottom";
ctx.font = "20px verdana";
ctx.fillStyle = "hsla(0,0%,0%,.1)";
// ctx.globalCompositeOperation = "source-over";

function draw() {
	ctx.fillRect(0, 0, W, H);
	ctx.save();
	ctx.translate(20, 30);
	ctx.fillStyle = "hsla(120,100%,50%,1)";
	// ctx.globalCompositeOperation = "lighter";
	for (i = 0; i < xl; i++) {
		text = String.fromCharCode(48 + Math.random() * 79);
		x = i * TW;
		y = arr[i];
		ctx.fillText(text, x, y);
		if (y > H || y > Math.random() * H * 4 + H / 4) {
			arr[i] = 0;
		} else {
			arr[i] = +parseInt(arr[i]) + TH;
		}
	}
	ctx.restore();
}

(function() {
	setInterval(draw, 60);
})();
